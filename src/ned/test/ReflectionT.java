package ned.test;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
/*
* JAVA反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；
* 对于任意一个对象，都能够调用它的任意一个方法；
* 这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制。*/

public final class ReflectionT {
	public static void main(String[] args) throws ClassNotFoundException, Exception, IllegalAccessException{
		/*//第一种方式：  
		Classc1 = Class.forName("Employee");  
		//第二种方式：  
		//java中每个类型都有class 属性.  
		Classc2 = Employee.class;  
		   
		//第三种方式：  
		//java语言中任何一个java对象都有getClass 方法  
		Employeee = new Employee();  
		Classc3 = e.getClass(); //c3是运行时类 (e的运行时类是Employee)  
*/
		Class<Person> c = (Class<Person>)Class.forName("ned.test.Person");
		//Object person = class1.newInstance();
		
		Field[] fs = c.getDeclaredFields();
		
		StringBuffer sb = new StringBuffer();
		sb.append(Modifier.toString(c.getModifiers()) + " class "+
		c.getSimpleName() + "{\n");
		
		for(Field field : fs){
			sb.append("\t");
			sb.append(Modifier.toString(field.getModifiers()) + " ");
			sb.append(field.getType().getSimpleName() + " ");
			sb.append(field.getName() + ";\n");
		}
		sb.append("}");
		
		System.out.println(sb.toString());
		
		Field nameFd = c.getDeclaredField("sex");
		Object o = c.newInstance();
//		nameFd.set(o, "ddddddddddddd");
//		System.out.println(nameFd.get(o));
		System.out.println(o instanceof Person);
		
		
		Method method = c.getDeclaredMethod("eat");
		method.invoke(o);
		
		Class[] ss = new Class[] { int.class,
                int.class };
		
//		System.out.println(ss[0]);
		
		
		Object[] objects =  new Object[] {"ZhangSan",20};
		System.out.println(objects[1]);
		
		String[] aa = new String[] {"dd", "dfdf"};
		System.out.println(aa[0]);
		
		Annotation[] annos = c.getAnnotations();
		Annotation an = annos[0];
		System.out.println(an);
		
		
		Dadd dadd = new Dadd();
		
//		AbstractChild child = new AbstractChild();
		
	}
}
