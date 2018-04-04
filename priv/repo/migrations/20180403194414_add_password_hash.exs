defmodule Task3.Repo.Migrations.AddPasswordHash do
  use Ecto.Migration

  def change do
    alter table("users") do
      add(:password_hash, :string, null: false)
    end
  end
end
