type AddAttachments = {
	inputFile?: string;
	inputScript?: string;

	attachments: AddAttachments_Attachment[];

	[x: string]: any;
};

type AddAttachments_Attachment = {
	name: string;
	content: Buffer;
};

type PackageInfo = {
	name: string;
	description: string;
	version: string;
	license: string;
	author: string;
	keywords: string[];
	main: string;
	homepage: string;
	scripts: {
		[x: string]: string;
	};
	devDependencies: {
		[x: string]: string;
	};
	dependencies: {
		[x: string]: string;
	};
}
