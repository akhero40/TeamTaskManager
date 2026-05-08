import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO',
  },
  dueDate: {
    type: Date,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  assigneeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

// Configure toJSON to map _id to id
taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    
    // Map populated fields to match Prisma output structure
    if (returnedObject.projectId && returnedObject.projectId.name) {
      returnedObject.project = returnedObject.projectId;
    }
    if (returnedObject.assigneeId && returnedObject.assigneeId.name) {
      returnedObject.assignee = returnedObject.assigneeId;
    }
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
