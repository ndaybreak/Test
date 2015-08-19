package ned.test;

@NameAnnotation
public class Person implements Animal{
	private String name = "ned";
	public String sex = "male";
	public Person(){
		
	}
	public Person(String name){
		this.name = name;
	}
	
	private void sleep(){
		System.out.println("sleeping");
	}
	public void eat(){
		System.out.println("eatting");
	}
	public void speak() {
		System.out.println("Speaking");
		
	}
}

// 只能在当前包内访问
class Dadd{
	
}

