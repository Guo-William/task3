defmodule Task3Web.TokenController do
  use Task3Web, :controller

  alias Task3.Accounts
  alias Task3.Accounts.User

  action_fallback(Task3Web.FallbackController)

  def create(conn, %{"email" => email, "pass" => pass}) do
    with {:ok, %User{} = user} <- Task3.Accounts.get_and_auth_user(email, pass) do
      IO.puts('------------------------------------------------IT IS HERE1')
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      IO.puts('------------------------------------------------IT IS HERE2')

      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
