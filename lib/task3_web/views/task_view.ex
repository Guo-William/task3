defmodule Task3Web.TaskView do
  use Task3Web, :view
  alias Task3Web.TaskView
  alias Task3Web.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{
      id: task.id,
      details: task.details,
      timespent: task.timespent,
      title: task.title,
      status: task.status,
      owner: render_one(task.owner, UserView, "user.json"),
      assignee: render_one(task.assignee, UserView, "user.json")
    }
  end
end
