export class Option
{
	Id: number;
	Name : string;

	constructor(id : number, name : string)
	{
		this.Id = id;
		this.Name = name;
	}

	Template() : string
	{
		//TODO add onclick that can actually end the test
		return `<button type="button" class="btn btn-primary">${this.Name}</button>`;
	}
}