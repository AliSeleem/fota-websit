// Hardcoded password for demonstration
const PASSWORD = process.env.AUTH_PASSWORD;

export async function POST(request: Request) {
	try {
		// Parse the request body
		const { password } = await request.json();

		// Validate the password
		if (!password) {
			return new Response(
				JSON.stringify({ success: false, message: "Password is required" }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		if (password === PASSWORD) {
			return new Response(
				JSON.stringify({ success: true, message: "Authentication successful" }),
				{
					status: 200,
					headers: { "Content-Type": "application/json" },
				}
			);
		} else {
			return new Response(
				JSON.stringify({ success: false, message: "Invalid password" }),
				{
					status: 401,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
	} catch (error) {
		console.error("Error in API route:", error);
		return new Response(
			JSON.stringify({ success: false, message: "Internal server error" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
