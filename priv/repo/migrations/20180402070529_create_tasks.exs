defmodule Task3.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add(:details, :string)
      add(:timespent, :integer)
      add(:title, :string, null: false)
      add(:status, :string)
      add(:owner_id, references(:users, on_delete: :delete_all), null: false)
      add(:assignee_id, references(:users, on_delete: :nilify_all))

      timestamps()
    end

    create(index(:tasks, [:owner_id]))
    create(index(:tasks, [:assignee_id]))
  end
end
