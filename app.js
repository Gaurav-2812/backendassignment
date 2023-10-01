const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://user:user@cluster0.76wo40x.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Task schema and model using Mongoose
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  status: Boolean,
});

let completedTasks = [];
let incompleteTasks = [];

const Task = mongoose.model('Task', taskSchema);

// Create routes for CRUD operations
app.post('/tasks', async (req, res) => {
  try {
    // Create a new task
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      status: false, // Initialize status as false (incomplete)
    });

    await newTask.save();
    incompleteTasks.push(newTask); // Add to incomplete tasks
    return res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add task' });
  }
});

app.get('/tasks', async (req, res) => {
  // Retrieve all tasks
  const tasks = await Task.find();
  res.json(tasks);
});

app.get('/tasks/completed', async (req, res) => {
  // Retrieve completed tasks
  const completedTasks = await Task.find({ status: true });
  res.json(completedTasks);
});

app.get('/tasks/incomplete', async (req, res) => {
  // Retrieve incomplete tasks
  const incompleteTasks = await Task.find({ status: false });
  res.json(incompleteTasks);
});

app.put('/tasks/:id', async (req, res) => {
  try {
    // Verify if the task exists
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task
    task.title = req.body.title;
    task.description = req.body.description;
    task.dueDate = req.body.dueDate;
    task.status = req.body.status;

    await task.save();

    // Update the appropriate task array
    if (req.body.status !== undefined) {
      if (req.body.status === true) {
        completedTasks.push(task);
        incompleteTasks = incompleteTasks.filter((t) => t._id.toString() !== req.params.id);
      } else {
        incompleteTasks.push(task);
        completedTasks = completedTasks.filter((t) => t._id.toString() !== req.params.id);
      }
    }

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update task' });
  }
});
// Mark a task as complete
app.put('/tasks/complete/:id', async (req, res) => {
  try {
    // Verify if the task exists
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task status to true (completed)
    task.status = true;
    await task.save();

    // Send the updated task as the response
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to mark task as completed' });
  }
});

// Mark a task as incomplete
app.put('/tasks/incomplete/:id', async (req, res) => {
  try {
    // Verify if the task exists
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task status to false (incomplete)
    task.status = false;
    await task.save();

    // Send the updated task as the response
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to mark task as incomplete' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    // Verify if the task exists
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Delete the task
    await Task.deleteOne({ _id: task._id });

    // Remove the task from both completed and incomplete tasks arrays
    completedTasks = completedTasks.filter((t) => t._id.toString() !== req.params.id);
    incompleteTasks = incompleteTasks.filter((t) => t._id.toString() !== req.params.id);

    return res.sendStatus(204); // No content, indicating successful deletion
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});