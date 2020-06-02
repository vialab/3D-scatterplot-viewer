export class Option
{
	id: number;
	name : string;

	constructor(id : number, name : string)
	{
		this.id = id;
		this.name = name;
	}

	Template() : string
	{
		//TODO add onclick that can actually end the test
		return `<button type="button" class="btn secondary">${this.name}</button>`;
	}
}