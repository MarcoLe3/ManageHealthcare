#Ask user for their calories for breakfast, lunch, dinner, and snacks in between meals
#Ask user how many calories did user burn from exercising and their bmr 
#Calculates user lbs. and says how much they will gain, lose, or stay the same. 


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
    
breakfast_calories = int(input("How many calories did you have for breakfast? "))
lunch_calories = int(input("How many calories did you have for lunch? "))
dinner_calories = int(input("How many calories did you have for dinner? "))
snack_calories = int(input("How many calories did you have for snack between meals? "))
exercise = int(input("How many calories did you burn from exercising/ working out? "))
bmr = int(input("What is your basic metabolic rate? "))

fitness = Diet(breakfast_calories, lunch_calories, dinner_calories, snack_calories, exercise, bmr)
weekly_deficit = 7 * fitness.calorie_deficit()

if weekly_deficit > 0:
    print(f"You will lose {round(weekly_deficit/ 3600, 2)} lbs. per week ")
elif weekly_deficit == 0:
    print("Your weight will stay the same. ")
else:
    print(f"You will gain {round(-1 * weekly_deficit/ 3600, 2)} lbs. per week. ")
