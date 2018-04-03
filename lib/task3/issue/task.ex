defmodule Task3.Issue.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field(:details, :string)
    field(:status, :string)
    field(:timespent, :integer)
    field(:title, :string)
    belongs_to(:owner, Task3.Accounts.User)
    belongs_to(:assignee, Task3.Accounts.User)

    timestamps()
  end

  @doc false
  def changeset(%Task{} = task, attrs) do
    task
    |> cast(attrs, [:details, :title, :timespent, :owner_id, :status, :assignee_id])
    |> validate_required([:title])
    |> fixTimeSpent
  end

  defp fixTimeSpent(changeset) do
    timeEntered = get_field(changeset, :timespent)

    if timeEntered do
      roundSurplus =
        if rem(timeEntered, 15) == 0 do
          0
        else
          1
        end

      userTime = Kernel.trunc(timeEntered / 15 + roundSurplus) * 15

      changeset
      |> change(timespent: userTime)
    else
      changeset
    end
  end
end
