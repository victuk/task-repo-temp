const express = require("express");
const cron = require("node-cron");

const router = express.Router();

router.post("/schedule", (req, res, next) => {
    try {
        
        const {message, date} = req.body;

        let task;

        if(date) {

            const theDate = new Date(date); // 2025-10-05T10:30:00Z

            const seconds = theDate.getSeconds();

            const minutes = theDate.getMinutes();

            const hour = theDate.getHours();

            const dayOfTheMonth = theDate.getDate();

            const month = theDate.getMonth() + 1;

            const dayOfTheWeek = theDate.getDay(); // 0, 7

            console.log(`Reminder for ${seconds}sec ${minutes}min ${hour}hr ${dayOfTheMonth} day day of the month ${month} (Day of the week ${dayOfTheWeek})`);

            task = cron.schedule(`${seconds} ${minutes} ${hour} ${dayOfTheMonth} ${month} *`, () => {
                console.log(`Task: ${message}`);
            });

        } else {

            task = cron.schedule("* * * * *", () => {
                console.log(`Task: ${message}`);
            });
        }

        // collection.create({title, description, taskId, date})
        console.log(task.id);

        res.send({
            message: "Cron job set successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
});

router.put("/action/:action", (req, res) => {
    try {

        const {action} = req.params;
        
        const {taskId} = req.body;

        const task = cron.getTask(taskId);

        if(!task) {
            res.status(404).send({
                message: "No task found"
            });
            return;
        }

        if(action == "start") {
            task.start();
        } else if (action == "stop") {
            task.stop();
        } else {
            res.status(400).send({
                message: "Invalid action"
            });
            return;
        }


        res.send({
            message: "Task stopped successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
});

module.exports = router;
