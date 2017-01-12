<test>

    <form ref="login" onsubmit={ submit }>
      <input ref="username" placeholder="username" required="required">
      <input ref="password" placeholder="password" required="required">
      <button ref="submit">Login</button>
    </form>
    <button ref="print" onclick={ print}>print</button>

    <script>
        print(e) {
            let username = this.refs.username.value,
                password = this.refs.password.value

            console.log('username', username)
        }
    </script>

</test>
