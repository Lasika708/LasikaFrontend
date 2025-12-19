import './ProjectCard.css';

const ProjectCard = ({ project, onEdit, onDelete, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'completed':
        return 'status-completed';
      case 'archived':
        return 'status-archived';
      default:
        return '';
    }
  };

  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-card-header">
        <h3 className="project-title">{project.title}</h3>
        <span className={`status-badge ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      {project.description && (
        <p className="project-description">{project.description}</p>
      )}

      <div className="project-card-footer">
        <div className="project-meta">
          <span className="project-date">
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <div className="project-actions">
          <button
            className="btn btn-edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;








