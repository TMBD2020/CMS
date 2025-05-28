
            <!-- Navbar -->
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <!-- Left navbar links -->
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                    </li>
                </ul>
                <!-- Right navbar links -->
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i class="fas fa-expand-arrows-alt"></i>
                        </a>
                    </li>

                    <li class="nav-item dropdown user-menu">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                           
                            <img src="#">
                           
                            <img src="#">
                           
                            <span class="d-none d-md-inline"></span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right" style="left: inherit; right: 0px;">
                            <!-- User image -->
                            <li class="user-header bg-primary">
                             
                                <img src="#">
                      
                                <img src="#">
                               
                                <p> {{ Auth::user()->name }} </p>
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <a href="" class="btn btn-default btn-flat">Profile</a>

                                <a href="{{route('logout')}}" onclick="event.preventDefault();
                            document.getElementById('logout-form').submit();" class="btn btn-default btn-flat float-right">Sign out</a>
                               
                               <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                               @csrf
                               </form>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <!-- /.navbar -->
