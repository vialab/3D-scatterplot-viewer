import {Option} from "./Option";

export class ImageOption extends Option
{
	imageSrc : string;

	constructor (id: number, imageSrc : string)
	{
		super(id, "");
		this.imageSrc = imageSrc;
	}

	Template() : string
	{
		return `<div style="flex: 1; display: flex; justify-content: center; cursor: pointer;"><img src="${this.imageSrc}" /></div>`
	}
}