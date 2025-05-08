export function decodeJwtToken(token: string): any {
  if (!token) {
    return null;
  }

  const payload = token.split('.')[1]; // Extract the payload part of the JWT
  const decodedPayload = atob(payload); // Decode the Base64-encoded payload
  const parsedPayload = JSON.parse(decodedPayload); // Parse the JSON string into an object

  // Extract only the important values
  return {
    name: parsedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
    email: parsedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
    id: parsedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
    role: parsedPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
    exp: parsedPayload.exp
  };
}
