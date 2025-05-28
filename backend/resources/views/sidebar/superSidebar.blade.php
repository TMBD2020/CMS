
            <!-- Main Sidebar Container -->
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                <!-- Brand Logo -->
                <a href="#" class="brand-link">
                    <?php if(!empty($companyInfo['logo'])):?>
                    <img src="{{asset('assets/images/companiesLogo')}}" alt="Company logo" class="brand-image img-circle elevation-3" style="opacity: .8">
                    <?php else: ?>
                    <?php if(!empty($templateData['logo'])):?>
                    <img src="{{asset('assets/images/<?php echo $templateData['logo'];?>')}}" alt="Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
                    <?php endif ?>
                    <?php endif ?>

                    <span class="brand-text font-weight-light" style="font-size: large;"><?php if(!empty($companyInfo['name'])){echo $companyInfo['name'];}else{if(!empty($templateData['header'])){echo $templateData['header'];}}?></span>
                </a>

                <!-- Sidebar -->
                <div class="sidebar">
                    <!-- Sidebar Menu -->
                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu" data-accordion="false">
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    <i class="nav-icon fas fa-tachometer-alt"></i>
                                    <p>Dashboard</p>
                                </a>
                            </li>

                           
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    <i class="nav-icon fa fa-university"></i>
                                    <p>Companies<i class="right fas fa-angle-left"></i></p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Add<span class="right badge badge-danger">New</span></p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Manage</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                           

                           
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    <i class="nav-icon fa fa-gift"></i>
                                    <p>Packages<i class="right fas fa-angle-left"></i></p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Add<span class="right badge badge-danger">New</span></p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Manage</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Payments<i class="right fas fa-angle-left"></i></p>
                                        </a>
                                        <ul class="nav nav-treeview">
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Add<span class="right badge badge-danger">New</span></p>
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Manage</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            

                            
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    <i class="nav-icon fa fa-users"></i>
                                    <p>Users</p>
                                </a>
                            </li>
                           

                           
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    <i class="nav-icon fa fa-users"></i>
                                    <p>Members<i class="right fas fa-angle-left"></i></p>
                                </a>
                                <ul class="nav nav-treeview">
                                  
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Add<span class="right badge badge-danger">New</span></p>
                                        </a>
                                    </li>
                                    
                                   
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Manage</p>
                                        </a>
                                    </li>
                                    
                                </ul>
                            </li>
                            
                           
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    <i class="nav-icon fa fa-wallet"></i>
                                    <p>Collections<i class="right fas fa-angle-left"></i></p>
                                </a>
                                <ul class="nav nav-treeview">
                                   
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Share payments<i class="right fas fa-angle-left"></i></p>
                                        </a>
                                        <ul class="nav nav-treeview">
                                         
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Add<span class="right badge badge-danger">New</span></p>
                                                </a>
                                            </li>
        
                                          
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Manage</p>
                                                </a>
                                            </li>
        
                                        </ul>
                                    </li>

                                </ul>
                            </li>
                        

                         
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    <i class="nav-icon fa fa-hand-holding-usd"></i>
                                    <p>Expenses<i class="right fas fa-angle-left"></i></p>
                                </a>
                                <ul class="nav nav-treeview">
                                 
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Salary payments<i class="right fas fa-angle-left"></i></p>
                                        </a>
                                        <ul class="nav nav-treeview">
                                            
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Add<span class="right badge badge-danger">New</span></p>
                                                </a>
                                            </li>
        
                                           
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Manage</p>
                                                </a>
                                            </li>
        
                                        </ul>
                                    </li>

                                 
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Invest payments<i class="right fas fa-angle-left"></i></p>
                                        </a>
                                        <ul class="nav nav-treeview">
                                          
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Add<span class="right badge badge-danger">New</span></p>
                                                </a>
                                            </li>
        
                                            
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Manage</p>
                                                </a>
                                            </li>
        
                                        </ul>
                                    </li>

                                  
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Other payments<i class="right fas fa-angle-left"></i></p>
                                        </a>
                                        <ul class="nav nav-treeview">
                                          
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Add<span class="right badge badge-danger">New</span></p>
                                                </a>
                                            </li>
        
                                            
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Manage</p>
                                                </a>
                                            </li>
        
                                        </ul>
                                    </li>

                                </ul>
                            </li>
                           
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    <i class="nav-icon fa fa-ticket-alt"></i>
                                    <p>Tickets<i class="right fas fa-angle-left"></i></p>
                                </a>
                                <ul class="nav nav-treeview">
                                    
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Add<span class="right badge badge-danger">New</span></p>
                                        </a>
                                    </li>

                                   
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Manage</p>
                                        </a>
                                    </li>

                                </ul>
                            </li>
                           

                          
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    <i class="nav-icon fa fa-cogs"></i>
                                    <p>Settings<i class="right fas fa-angle-left"></i></p>
                                </a>
                                <ul class="nav nav-treeview">
                                  
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Roles<i class="right fas fa-angle-left"></i></p>
                                        </a>
                                        <ul class="nav nav-treeview">
                                          
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Add<span class="right badge badge-danger">New</span></p>
                                                </a>
                                            </li>
        
                                           
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Manage</p>
                                                </a>
                                            </li>
        
                                        </ul>
                                    </li>


                                 
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>System data<i class="right fas fa-angle-left"></i></p>
                                        </a>
                                        <ul class="nav nav-treeview">
                                         
                                            <li class="nav-item">
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Add<span class="right badge badge-danger">New</span></p>
                                                </a>
                                            </li>
        
                                            
                                                <a href="#" class="nav-link">
                                                    <i class="far fa-dot-circle nav-icon"></i>
                                                    <p>Manage</p>
                                                </a>
                                            </li>
        
                                        </ul>
                                    </li>

                                   
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Template data</p>
                                        </a>
                                    </li>

                                   
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Company profile</p>
                                        </a>
                                    </li>

                                </ul>
                            </li>
                           
                        </ul>
                    </nav>
                    <!-- /.sidebar-menu -->
                </div>
                <!-- /.sidebar -->
            </aside>