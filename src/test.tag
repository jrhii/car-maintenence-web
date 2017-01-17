<test>

    <form ref="login" onsubmit={ submit }>
      <input ref="username" placeholder="username" required="required">
      <input ref="password" placeholder="password" required="required">
      <button ref="submit">Login</button>
    </form>

    <script>
        const socket = opts.socket

        submit(e) {
            let username = this.refs.username.value,
                password = this.refs.password.value

            socket.emit('register', username, password)
            //check for login
        }
    </script>

</test>
