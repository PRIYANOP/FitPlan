
import java.util.Scanner;

public class FitPlan {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("===== FITPLAN WORKOUT PLANNER =====");
        System.out.print("Enter your name: ");
        String name = sc.nextLine();

        System.out.println("\nChoose your fitness goal:");
        System.out.println("1. Fat Loss");
        System.out.println("2. Muscle Gain");
        System.out.println("3. General Fitness");
        System.out.print("Enter your choice: ");

        int choice = sc.nextInt();

        switch (choice) {
            case 1:
                System.out.println("\nWorkout Plan: Fat Loss");
                System.out.println("- Walking or cycling");
                System.out.println("- Full-body strength training");
                System.out.println("- Gradually increase activity");

                System.out.println("\nFood Suggestions:");
                System.out.println("- Vegetables and fruits");
                System.out.println("- Protein-rich foods");
                System.out.println("- Balanced meals");
                break;

            case 2:
                System.out.println("\nWorkout Plan: Muscle Gain");
                System.out.println("- Monday: Chest and triceps");
                System.out.println("- Tuesday: Back and biceps");
                System.out.println("- Wednesday: Rest");
                System.out.println("- Thursday: Legs and core");
                System.out.println("- Friday: Upper body");

                System.out.println("\nFood Suggestions:");
                System.out.println("- Eggs, beans or tofu");
                System.out.println("- Rice, oats and other carbohydrates");
                System.out.println("- Milk or suitable alternatives");
                break;

            case 3:
                System.out.println("\nWorkout Plan: General Fitness");
                System.out.println("- Walking or cycling");
                System.out.println("- Full-body strength training");
                System.out.println("- Stretching and mobility");

                System.out.println("\nFood Suggestions:");
                System.out.println("- Balanced meals");
                System.out.println("- Fruits and vegetables");
                System.out.println("- Drink enough water");
                break;

            default:
                System.out.println("Invalid choice. Select 1, 2 or 3.");
        }

        System.out.println("\nGood luck, " + name + "!");
        sc.close();
    }
}
