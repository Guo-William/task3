defmodule Task3.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field(:email, :string)
    field(:username, :string)
    field(:password_hash, :string)
    field(:password, :string, virtual: true)
    # Taken from https://github.com/NatTuck/microblog-spa and
    # changed for my needs
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    pass = Map.get(attrs, "password")
    password_hash = Comeonin.Argon2.hashpwsalt(pass)
    with_hash = Map.put(attrs, "password_hash", password_hash)

    user
    |> cast(with_hash, [:username, :email, :password_hash])
    |> validate_required([:username, :email, :password_hash])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
    |> unique_constraint(:username)
  end
end
