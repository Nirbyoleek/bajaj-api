// api/bfhl.js

import { json } from "body-parser";

export default function (req, res) {
	if (req.method === "POST") {
		// Handle POST request
		try {
			const { data } = req.body;

			if (!data || !Array.isArray(data)) {
				throw new Error("Invalid input data");
			}

			const numbers = [];
			const alphabets = [];

			data.forEach((item) => {
				if (/^[0-9]+$/.test(item)) {
					numbers.push(item);
				} else if (/^[A-Za-z]$/.test(item)) {
					alphabets.push(item);
				}
			});

			const highestAlphabet =
				alphabets.length > 0
					? alphabets.reduce((max, current) => {
							return current.toLowerCase() > max.toLowerCase() ? current : max;
					  })
					: null;

			const response = {
				is_success: true,
				user_id: process.env.USER_ID || "nirbyoleek_das_15112001",
				email: process.env.EMAIL || "nd3022@srmist.edu.in",
				roll_number: process.env.ROLL_NUMBER || "RA2011051010021",
				numbers,
				alphabets,
				highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
			};

			res.status(200).json(response);
		} catch (error) {
			res.status(400).json({ is_success: false, error: error.message });
		}
	} else if (req.method === "GET") {
		// Handle GET request
		res.status(200).json({ operation_code: 1 });
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
