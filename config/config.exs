# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :task3,
  ecto_repos: [Task3.Repo]

# Configures the endpoint
config :task3, Task3Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "pjMW4OsMDsEsjBB5q+WLzER1Fir5A3uxkbxWRD0kir/qm6uTQBKugZEgoyDpP7rO",
  render_errors: [view: Task3Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Task3.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
