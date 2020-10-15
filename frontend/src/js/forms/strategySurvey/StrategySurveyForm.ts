import { TaskDisplay, UserInterface } from "../../io";

export class StrategySurveyForm extends TaskDisplay
{
	public Display(screen: UserInterface): void
	{
		let template = $(
			`<div class="center-content" style="flex-direction: column; max-height: 100%; width: 90%; overflow: scroll; overflow-x: auto;">
				<div style="max-height: 100%;">
					<style>
						.thisdiv
						{
							display: flex;
							flex-direction: column;
							margin-bottom: 15px;
						}
					</style>
					
					<p style="margin-top: 100px;">
						Please describe any strategies that you used to solve each type of test or task.
					</p>
					
					<hr />

					<div class="thisdiv">
						<img style="width: 200px; height: 75px; margin-right: 10px;"
							src="images/feedback/fold1.png"
						/>
						<p>Paper Folding / Punching</p>
						<textarea style="width: 500px;"></textarea>
					</div>

					<hr />

					<div class="thisdiv">
						<img style="width: 200px; height: 75px; margin-right: 10px;"
							src="images/feedback/rotationpreview.png"
						/>
						<p>3D Rotation</p>
						<textarea style="width: 500px;"></textarea>
					</div>

					<hr />

					<div class="thisdiv">
						<img style="width: 75px; height: 75px; margin-right: 10px;"
							src="images/feedback/sample-piechart.png"
						/>
						<p>Pie Chart Comparison</p>
						<textarea style="width: 500px;"></textarea>
					</div>

					<hr />

					<div class="thisdiv">
						<img style="width: 250px; height: 100px; margin-right: 10px;"
							src="images/feedback/scatterplotpreview.png"
						/>
						<p>Scatter Plot</p>
						<textarea style="width: 500px;"></textarea>
					</div>

					<hr />

					<div class="thisdiv">
						<div style="display: flex; flex-direction: row;">
							<img style="width: 75px; height: 75px;"
								src="images/feedback/Contour_Plot.jpg"
							/>
							<img style="width: 75px; height: 75px; margin-right: 10px;"
								src="images/feedback/3D_Surface.jpg"
							/>
						</div>
						<p>Isocontour</p>
						<textarea style="width: 500px;"></textarea>
					</div>

				</div>
			</div>`
		);
		
		screen.ContentContainer().append(template);
		screen.ViewModeContent();
	}
}