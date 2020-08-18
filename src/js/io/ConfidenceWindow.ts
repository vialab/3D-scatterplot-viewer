export class ConfidenceWindow
{
	public OnSubmit : () => void;
	
	constructor()
	{
		this.OnSubmit = () => {};
		$("#begin-test").click(() =>
		{
			this.OnSubmit();
			this.Hide();
		});
	}

	public Show()
	{
		$("#transition").show();
	}

	public Hide()
	{
		$("#transition").hide();
	}

	public ConfidenceValue() : number
	{
		return <number>$("").val();
	}
}