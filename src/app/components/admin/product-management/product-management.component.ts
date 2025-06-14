import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-product-management',
  imports: [NgFor, NgIf, FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: any[] = [];
  brands: string[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedBrand: string = '';
  selectedFile: File | null = null;

  categoryMap: { [key: number]: string } = {
    1: 'Digital',
    2: 'Analogue',
    3: 'Smart',
  };
  categoryKeys: number[] = Object.keys(this.categoryMap).map(Number);

  addProductForm: FormGroup;
  editProductForm: FormGroup;
  showAddProductForm: boolean = false; // Control form visibility
  selectedProduct: any = null; // Track the selected product for editing

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private notifyService: NotifyService
  ) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required]
    });

    this.editProductForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http.get('https://localhost:7194/api/Product').subscribe(
      (data: any) => {
        this.products = data;
        this.brands = [...new Set(this.products.map(product => product.brand))];
        this.filteredProducts = this.products;
        this.filterProducts(); // Ensure filteredProducts is updated
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesBrand = this.selectedBrand ? product.brand === this.selectedBrand : true;
      return matchesName && matchesBrand;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  addProduct() {
    if (this.addProductForm.valid) {
      const productData = this.addProductForm.value;

      this.http.post('https://localhost:7194/api/Product', productData).subscribe({
        next: (data: any) => {
          console.log('Product added successfully:', data);
          this.products.push(data);
          this.showAddProductForm = false;
          this.addProductForm.reset();
          this.notifyService.productAdded();
          this.refreshProductList();

          if (this.selectedFile) {
            this.uploadProductImage(data.id);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding product:', error);
          this.notifyService.operationFailed('add product', 'Please check your input and try again');
        }
      });
    }
  }

  updateProduct() {
    if (this.editProductForm.valid) {
      const productData = this.editProductForm.value;

      this.http.put(`https://localhost:7194/api/Product/${productData.id}`, productData).subscribe({
        next: (data: any) => {
          console.log('Product updated successfully:', data);
          const index = this.products.findIndex(p => p.id === productData.id);
          if (index !== -1) {
            this.products[index] = data;
          }
          this.selectedProduct = null;
          this.notifyService.productUpdated();
          this.refreshProductList();

          if (this.selectedFile) {
            this.uploadProductImage(productData.id);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating product:', error);
          this.notifyService.operationFailed('update product', 'Please check your input and try again');
        }
      });
    }
  }

  uploadProductImage(productId: number) {
    const formData = new FormData();
    formData.append('file', this.selectedFile!);

    this.http.post(`https://localhost:7194/api/ProductImage/${productId}/upload`, formData).subscribe(
      (data: any) => {
        console.log('Product image uploaded successfully:', data);
        this.selectedFile = null; // Clear selected file after upload
        this.refreshProductList(); // Refresh the product list
      },
      (error: HttpErrorResponse) => {
        console.error('Error uploading product image:', error);
      }
    );
  }

  refreshProductList() {
    this.http.get('https://localhost:7194/api/Product').subscribe(
      (data: any) => {
        this.products = data;
        this.filteredProducts = this.products;
        this.filterProducts(); // Ensure filteredProducts is updated
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  editProduct(product: any) {
    this.selectedProduct = { ...product }; // Clone the product to avoid direct mutation
    this.editProductForm.patchValue(this.selectedProduct);
    this.showAddProductForm = false; // Hide add form when edit form is visible
  }

  cancelEdit() {
    this.selectedProduct = null; // Clear the selected product to cancel editing
  }

  deleteProduct(id: number) {
    const product = this.products.find(p => p.id === id);
    if (!product) return;

    this.notifyService.confirmDeleteProduct(product.name).then((confirmed) => {
      if (confirmed) {
        this.http.delete(`https://localhost:7194/api/Product/${id}`).subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== id);
            this.notifyService.productDeleted();
            this.refreshProductList();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error deleting product:', error);
            this.notifyService.operationFailed('delete product', 'Please try again later');
          }
        });
      }
    });
  }

  getProductsByCategory(event: Event) {
    const categoryId = (event.target as HTMLSelectElement).value;
    if (categoryId) {
      this.http.get(`https://localhost:7194/api/Product/category/${categoryId}`).subscribe(
        (data: any) => {
          this.filteredProducts = data;
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching products by category:', error);
        }
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  getBestSellers(count: number) {
    this.http.get(`https://localhost:7194/api/Product/bestsellers/${count}`).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching best sellers:', error);
      }
    );
  }

  searchProducts(term: string) {
    if (term) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.brand.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.searchTerm = inputElement.value;
      this.searchProducts(this.searchTerm);
    }
  }
}
