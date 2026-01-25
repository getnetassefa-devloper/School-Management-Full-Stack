app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 2. Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Success! Return user data (but NOT the password)
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ 
      message: "Login successful", 
      user: userWithoutPassword 
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});