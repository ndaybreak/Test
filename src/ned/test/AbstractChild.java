package ned.test;

public class AbstractChild extends AbstractParent{

	@Override
	public void run() {
		String nameString = "s";
		System.out.println(nameString);
		
	}
	public AbstractChild(String name){
		System.out.println("constractor");
		dd = "ddd";
	}
	private String nameString;
	public final String dd;
	public String sex;
	{
		System.out.println(111);
		sex = "male";
	}
	
	public String speak(String name){
		System.out.println("speaking");
		return "ddfd";
	}
	public String speak(){
		return "";
	}
	
	public static void main(String[] args){
		AbstractChild child = new AbstractChild("ss");
		System.out.println(child.sex);
		child.run();
		System.out.println(child.xxxxxxxx);
		child.speak();
	}

}
