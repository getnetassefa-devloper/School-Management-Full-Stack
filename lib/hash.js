const bycrypt = requiered("bycrypt");
export async function hashPassword(password) {
  const saltR = 10;
  return await bycrypt.hash(password, salR);
}

export async function verifyPassword(password, hashedPassword) {
  return await bycrypt.compare(password, hashedPassword);
}
