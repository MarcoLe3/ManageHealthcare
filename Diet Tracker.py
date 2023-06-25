#Ask user for their calories for breakfast, lunch, dinner, and snacks in between meals this week
#Ask user how many calories did user burn from exercising this week and their bmr 
#Calculates user lbs. and says how much they will gain, lose, or stay the same. this week


class Diet:
    def __init__(self, breakfast_calories, lunch_calories, dinner_calories, snack_calories, exercise, bmr):
        self.breakfast_calories = breakfast_calories
        self.lunch_calories = lunch_calories
        self.dinner_calories = dinner_calories
        self.snack_calories = snack_calories
        self.exercise = exercise
        self.bmr = bmr
    
    def calorie_deficit(self):
        deficit = self.bmr + self.exercise - (self.breakfast_calories + self.lunch_calories + self.dinner_calories + self.snack_calories)
        return deficit
    
breakfast_calories = int(input("How many calories did you have for breakfast this week? "))
lunch_calories = int(input("How many calories did you have for lunch this week? "))
dinner_calories = int(input("How many calories did you have for dinner this week? "))
snack_calories = int(input("How many calories did you have for snack between meals this week? "))
exercise = int(input("How many calories did you burn from exercising/ working out this week? "))
bmr = int(input("What is your basic metabolic rate? "))

fitness = Diet(breakfast_calories, lunch_calories, dinner_calories, snack_calories, exercise, bmr)
weekly_deficit = 7 * fitness.calorie_deficit()

if weekly_deficit > 0:
    print(f"You've lost {round(weekly_deficit/ 3600, 2)} lbs. this week ")
elif weekly_deficit == 0:
    print("Your weight will stay the same this week. ")
else:
    print(f"You've gain {round(-1 * weekly_deficit/ 3600, 2)} lbs. this week. ")
