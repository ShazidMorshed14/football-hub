const TodoCard = ({ todo, innerRef, ...props }) => {
  return (
    <p
      className="todo-card"
      key={todo.id}
      ref={innerRef}
      {...props}
      style={{ minHeight: "150px" }}
    >
      {todo.title}
    </p>
  );
};

export default TodoCard;
