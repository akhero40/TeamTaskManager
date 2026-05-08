import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// Virtual for tasks
projectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'projectId',
});

// Configure toJSON to include virtuals and map _id to id
projectSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    
    // Also map ownerId to owner if populated to match Prisma output
    if (returnedObject.ownerId && returnedObject.ownerId.name) {
      returnedObject.owner = returnedObject.ownerId;
    }
  }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
