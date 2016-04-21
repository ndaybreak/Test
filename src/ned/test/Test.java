package ned.test;

public class Test extends Person{
	public static void main(String[] args){

		
		show();
		System.out.println(name + '1');
	}
	static String name = "xxxx";
	
	public static void show(){
		System.out.println(name + '2');
		String name = "xiao";
		System.out.println(name + '3');
		if(true){
			String age = "xxx";
			System.out.println(age);
		}

		System.out.println(name + '4');
	}
	
}
