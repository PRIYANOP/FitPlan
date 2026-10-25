
const form = document.getElementById("planner-form");
const results = document.getElementById("results");

const workoutList = document.getElementById("workout-list");
const foodList = document.getElementById("food-list");

const plans = {
    "fat-loss": {
        title: "Move more, get stronger",
        foodIntro: "Build satisfying meals that support energy, recovery and sustainable habits.",
        foods: [
            "Protein: eggs, beans, lentils, tofu or fish",
            "Vegetables and fruit in a variety of colours",
            "Carbohydrates such as oats, rice and whole grains",
            "Healthy fats such as nuts, seeds and olive oil"
        ],
        workouts: [
            { name: "Full-body strength", home: "Squats to a chair, wall push-ups and glute bridges.", gym: "Leg press, chest press and cable rows." },
            { name: "Cardio", home: "Brisk walking, dancing or low-impact step exercises.", gym: "Treadmill walking or stationary cycling." },
            { name: "Full-body strength", home: "Supported lunges, incline push-ups and bird dogs.", gym: "Goblet squats, machine chest press and lat pulldowns." },
            { name: "Cardio and mobility", home: "Comfortable-paced walking and gentle stretching.", gym: "Easy cycling and mobility exercises." },
            { name: "Strength and movement", home: "Repeat familiar bodyweight movements at your pace.", gym: "A manageable full-body resistance session." },
            { name: "Enjoyable activity", home: "Walk outdoors, dance or choose an activity you enjoy.", gym: "Light cardio or a preferred low-impact activity." }
        ]
    },

    "muscle-gain": {
        title: "Build strength, one session at a time",
        foodIntro: "Eat enough to support training and recovery. Include protein and energy-rich foods throughout your day.",
        foods: [
            "Protein: eggs, dairy, tofu, beans, lentils or lean meat",
            "Carbohydrates: rice, oats, potatoes and whole grains",
            "Healthy fats: nuts, seeds and nut butters",
            "Regular balanced meals and snacks as needed"
        ],
        workouts: [
            { name: "Upper body", home: "Incline push-ups, backpack rows and shoulder raises.", gym: "Chest press, lat pulldowns and shoulder press." },
            { name: "Lower body", home: "Squats, glute bridges and calf raises.", gym: "Leg press, Romanian deadlifts and calf raises." },
            { name: "Recovery", home: "Rest or take a gentle walk.", gym: "Rest or do comfortable mobility work." },
            { name: "Upper body", home: "Push-ups at a suitable level, rows and curls with light weights.", gym: "Seated rows, chest press and biceps curls." },
            { name: "Lower body and core", home: "Split squats with support, bridges and bird dogs.", gym: "Squats or leg press, hamstring curls and core work." },
            { name: "Optional light activity", home: "Gentle walking or mobility.", gym: "Easy cycling or a light technique session." }
        ]
    },

    "general": {
        title: "Find your everyday balance",
        foodIntro: "Aim for variety, enjoyable movement and habits that fit your everyday life.",
        foods: [
            "A variety of vegetables and fruits",
            "Protein sources such as beans, eggs, tofu or fish",
            "Energy-giving foods such as rice, oats and whole grains",
            "Water throughout the day and balanced meals"
        ],
        workouts: [
            { name: "Full-body movement", home: "Chair squats, wall push-ups and bird dogs.", gym: "Leg press, chest press and seated rows." },
            { name: "Cardio", home: "Walk, dance or cycle at a comfortable pace.", gym: "Treadmill walking or stationary cycling." },
            { name: "Strength and mobility", home: "Glute bridges, supported lunges and gentle stretching.", gym: "Resistance machines and mobility exercises." },
            { name: "Enjoyable activity", home: "Take a walk or try an activity you enjoy.", gym: "Choose comfortable cardio or a light workout." },
            { name: "Full-body movement", home: "Repeat your familiar exercises with good technique.", gym: "A manageable full-body strength session." },
            { name: "Active recovery", home: "Gentle walking and stretching.", gym: "Easy cycling or mobility work." }
        ]
    }
};

const beginnerAdjustments = {
    home: "Start with 1–2 comfortable sets; rest as needed.",
    gym: "Start with light resistance and focus on technique."
};

const intermediateAdjustments = {
    home: "Try 2–3 controlled sets if the exercises feel comfortable.",
    gym: "Try 2–3 controlled sets with a manageable resistance."
};

const advancedAdjustments = {
    home: "Use a challenging but controlled variation and allow recovery.",
    gym: "Use appropriate resistance and maintain controlled technique."
};

function makeWorkoutPlan(goal, days, place, level) {
    const selectedPlan = plans[goal];
    const levelNotes = {
        beginner: "Keep it comfortable and learn the movements first.",
        intermediate: "Build gradually on movements you already know.",
        advanced: "Choose appropriate challenges without sacrificing technique."
    };

    const note = place === "home"
        ? beginnerAdjustments[ level === "beginner" ? "home" : level === "intermediate" ? "home" : "home" ]
        : beginnerAdjustments.gym;

    const adjustment = level === "beginner"
        ? beginnerAdjustments[place]
        : level === "intermediate"
            ? intermediateAdjustments[place]
            : advancedAdjustments[place];

    workoutList.replaceChildren();

    for (let i = 0; i < days; i++) {
        const workout = selectedPlan.workouts[i % selectedPlan.workouts.length];

        const day = document.createElement("article");
        day.className = "workout-day";

        const top = document.createElement("div");
        top.className = "workout-day-top";

        const number = document.createElement("span");
        number.className = "day-number";
        number.textContent = String(i + 1).padStart(2, "0");

        const name = document.createElement("strong");
        name.textContent = workout.name;

        const description = document.createElement("p");
        description.textContent = place === "home" ? workout.home : workout.gym;

        const tip = document.createElement("p");
        tip.textContent = adjustment;

        top.append(number, name);
        day.append(top, description, tip);
        workoutList.appendChild(day);
    }

    foodList.replaceChildren();

    selectedPlan.foods.forEach(food => {
        const item = document.createElement("li");
        item.textContent = food;
        foodList.appendChild(item);
    });

    document.getElementById("food-intro").textContent = selectedPlan.foodIntro;

    return levelNotes[level] || levelNotes.beginner;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = new FormData(form);
    const goal = data.get("goal");

    if (!plans[goal]) {
        alert("Please choose a fitness goal.");
        return;
    }

    const name = String(data.get("name") || "").trim();
    const days = Number(data.get("days"));
    const place = data.get("place");
    const level = data.get("level");

    if (![2, 3, 4, 5, 6].includes(days) ||
        !["home", "gym"].includes(place) ||
        !["beginner", "intermediate", "advanced"].includes(level)) {
        alert("Please check your selections and try again.");
        return;
    }

    const selectedPlan = plans[goal];
    const levelNote = makeWorkoutPlan(goal, days, place, level);

    document.getElementById("result-title").textContent =
        name ? `${name}, let's get moving.` : "Let's get moving.";

    document.getElementById("result-subtitle").textContent =
        `${days} workout days per week · ${level.charAt(0).toUpperCase() + level.slice(1)} · ${place === "home" ? "At home" : "At the gym"}. ${levelNote}`;

    results.hidden = false;

    results.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("edit-plan").addEventListener("click", function () {
    document.getElementById("planner").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

document.getElementById("start-over").addEventListener("click", function () {
    form.reset();
    results.hidden = true;
    document.getElementById("planner").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

document.getElementById("year").textContent = new Date().getFullYear();
