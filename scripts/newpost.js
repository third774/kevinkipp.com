// script for creating a new post in src/content/blog
// we want to ask the user for the title of the post
// before creating the file. We will use the post
// title to create the file name. The file name will
// be the title with spaces replaced with dashes and
// all lowercase. We will also ask the user for the
// post description. We will use the post description
// to create the meta description for the post.

import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question("Enter the title of the post: ", (title) => {
	rl.question("Enter the description of the post: ", (description) => {
		const fileName = `${title.replace(/\s+/g, "-").toLowerCase()}.mdx`;
		const filePath = `./src/content/blog/-draft-${fileName}`;
		const fileContent = `---
{
	"title": "${title}",${description ? `,\n	"description": "${description}",` : ""}
	"published": "${new Date().toISOString()}",
}
---

`;

		fs.writeFile(filePath, fileContent, (err) => {
			if (err) {
				console.error("An error occurred:", err);
			} else {
				console.log(`Blog post created successfully at ${filePath}`);
			}

			rl.close();
		});
	});
});
