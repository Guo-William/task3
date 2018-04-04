defmodule Task3Web.TaskController do
  use Task3Web, :controller

  alias Task3.Issue
  alias Task3.Issue.Task

  action_fallback(Task3Web.FallbackController)

  def index(conn, _params) do
    tasks = Issue.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    # Taken from https://github.com/NatTuck/microblog-spa and
    # changed for my needs
    {:ok, user_id} =
      Phoenix.Token.verify(conn, "auth token", task_params["token"], max_age: 86400)

    if task_params["owner_id"] != user_id do
      raise "Incorrect user!"
    end

    with {:ok, %Task{} = task} <- Issue.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Issue.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Issue.get_task!(id)

    with {:ok, %Task{} = task} <- Issue.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Issue.get_task!(id)

    with {:ok, %Task{}} <- Issue.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
