export class RotationImageSrc
{
	public static GetSrc(value : number) : string
	{
		let paddedNumber = RotationImageSrc.padDigits(value);
		return "/images/3drotation/PSVT-R_Test_Page_"+paddedNumber+".jpg";
	}

	private static padDigits(value : number)
	{
		return value < 10? "0"+value : value;
	}
}