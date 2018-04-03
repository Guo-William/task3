defmodule Task3Web.TokenView do
  use Task3Web, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      token: token
    }
  end
end
