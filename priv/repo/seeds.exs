# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Task3.Repo.insert!(%Task3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Task3.Repo
alias Task3.Accounts.User
alias Task3.Issue.Task

p = Comeonin.Argon2.hashpwsalt("password1")

Repo.insert!(%User{
  email: "Jack@Jack.com",
  username: "Jack",
  password_hash: p
})

Repo.insert!(%User{
  email: "Jill@Jill.com",
  username: "Jill",
  password_hash: p
})

Repo.insert!(%Task{
  title: "test",
  owner_id: 1,
  assignee_id: 2,
  status: "COMPLETE"
})

Repo.insert!(%Task{
  title: "not done",
  owner_id: 2,
  assignee_id: 2,
  status: "INPROGRESS"
})

Repo.insert!(%Task{
  title: "not s",
  owner_id: 2,
  assignee_id: 1,
  status: "NOT STARTED"
})
