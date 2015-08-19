package ned.test;

import java.lang.reflect.Array;

import javax.servlet.http.HttpServletRequest;

public class Test2 {
	public static void main(String[] args){
//		System.out.println(1 + "2");
		String aString ="dd";
		int dd = 2;
		
		
		int[] arr = {12,24,35};
		for(int i = 0, len = arr.length; i < len; i++){
			System.out.println(arr[i]);
		}
		
	}
	public static void show(String name){
		name = "ming";
		System.out.println(name);
	}
	public static void getHeader(){
		
	}
}
