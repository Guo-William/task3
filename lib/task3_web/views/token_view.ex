defmodule Task3Web.TokenView do
  use Task3Web, :view
  # Taken from https://github.com/NatTuck/microblog-spa and
  # changed for my needs
  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      token: token
    }
  end
end
