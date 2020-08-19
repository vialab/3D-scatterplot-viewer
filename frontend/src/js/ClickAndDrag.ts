
//Class to help track mouse drags even when the mouse leaves the clicked element
export class ClickAndDrag
{
	private element : JQuery<HTMLElement>;

	public MouseDown : (evt : JQuery.MouseDownEvent) => void = (evt) => {};
	public MouseUp : (evt : JQuery.MouseUpEvent) => void = (evt) => {};
	public MouseDragged : (evt : JQuery.MouseMoveEvent) => void = (evt) => {};

	protected isDragging : boolean = false;

	constructor(element : JQuery<HTMLElement>)
	{
		this.element = element;

		this.element.mousedown((evt) =>
		{
			this.isDragging = true;
			this.MouseDown(evt);
		});

		$(window).mouseup((evt) =>
		{
			if (this.isDragging)
			{
				this.MouseUp(evt);
			}

			this.isDragging = false;
		});

		$(window).mousemove((evt) =>
		{
			if (this.isDragging)
			{
				this.MouseDragged(evt);
			}
		});
	}
}