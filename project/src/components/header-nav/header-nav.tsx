export default function HeaderNav(): JSX.Element {
  return (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        <li className='header__nav-item user'>
          <a className='header__nav-link header__nav-link--profile' href='#ref'>
            <div className='header__avatar-wrapper user__avatar-wrapper'></div>
            <span className='header__user-name user__name'>
              Oliver.conner@gmail.com
            </span>
            <span className='header__favorite-count'>3</span>
          </a>
        </li>
        <li className='header__nav-item'>
          <a className='header__nav-link' href='#ref'>
            <span className='header__signout'>Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

/*
      <header class="header">
        <div class="container">
          <div class="header__wrapper">
            <div class="header__left">
              <a class="header__logo-link" href="main.html">
                <img class="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41">
              </a>
            </div>
            <nav class="header__nav">
              <ul class="header__nav-list">
                <li class="header__nav-item user">
                  <a class="header__nav-link header__nav-link--profile" href="#">
                    <div class="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span class="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      */
