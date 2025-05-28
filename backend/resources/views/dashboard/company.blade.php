@extends('layout.app')
@section('title','Dashboard')
@section('content')
    
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Dashboard</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
        <div class="container-fluid">
          
            <div class="row">
              
                <div class="col-lg-3 col-6">
                    <!-- small box -->
                    <div class="small-box bg-info">
                        <div class="inner">
                            <h3><?php if(!empty($totalCompanies)){echo $totalCompanies;}else{echo 0;} ?></h3>
                            <p>Active companies!</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-university"></i>
                        </div>
                        <a href="" class="small-box-footer" title="View all companies">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <!-- ./col -->
             
                
               
                <div class="col-lg-3 col-6">
                    <!-- small box -->
                    <div class="small-box bg-primary">
                        <div class="inner">
                            <h3><?php if(!empty($totalUsers)){echo $totalUsers;}else{echo 0;} ?></h3>
                            <p>Active users!</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-users"></i>
                        </div>
                        <a href="#" class="small-box-footer" title="View all users">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <!-- ./col -->
               

               
                <div class="col-lg-3 col-6">
                    <!-- small box -->
                    <div class="small-box bg-success">
                        <div class="inner">
                            <h3><?php if(!empty($totalMembers)){echo $totalMembers;}else{echo 0;} ?></h3>
                            <p>Active members!</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-users"></i>
                        </div>
                        <a href="#" class="small-box-footer" title="View all members">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <!-- ./col -->
              

               
                <div class="col-lg-3 col-6">
                    <!-- small box -->
                    <div class="small-box bg-yellow">
                        <div class="inner">
                            <h3><?php if(!empty($totalEmployees)){echo $totalEmployees;}else{echo 0;} ?></h3>
                            <p>Active employees!</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-users"></i>
                        </div>
                        <a href="#" class="small-box-footer" title="View all employees">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <!-- ./col -->


              
                <div class="col-lg-3 col-6">
                    <!-- small box -->
                    <div class="small-box bg-yellow">
                        <div class="inner">
                            <h3><?php if(!empty($totalPackages)){echo $totalPackages;}else{echo 0;} ?></h3>
                            <p>Active packages!</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-gift"></i>
                        </div>
                        <a href="#" class="small-box-footer" title="View all packages">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <!-- ./col -->
               

               
                <div class="col-lg-3 col-6">
                    <!-- small box -->
                    <div class="small-box bg-success">
                        <div class="inner">
                            <h3><?php if(!empty($totalBankAccounts)){echo $totalBankAccounts;}else{echo 0;} ?></h3>
                            <p>Active bank accounts!</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-address-card"></i>
                        </div>
                        <a href="#" class="small-box-footer" title="View all bank accounts">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <!-- ./col -->
              

               
                <div class="col-lg-3 col-6">
                    <!-- small box -->
                    <div class="small-box bg-primary">
                        <div class="inner">
                            <h3><?php if(!empty($totalProjects)){echo $totalProjects;}else{echo 0;} ?></h3>
                            <p>Active projects!</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-file-powerpoint"></i>
                        </div>
                        <a href="#" class="small-box-footer" title="View all projects">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <!-- ./col -->
               
            </div>
            <!-- /.row -->
        
    
            <div class="row">
                <div class="col-sm-12 col-xs-12">
                    <div class="card card-info">
                        <div class="card-header">
                            <h3 class="card-title">Companies overview</h3>

                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <table id="dataTable" class="table table-bordered table-striped" style="font-size: 13px">
                                <thead>
                                    <tr>
                                        <th style="text-align: right;">#</th>
                                        <th>Company</th>
                                        <th>Package</th>
                                        <th style="text-align: right;">Total user</th>
                                        <th style="text-align: right;">Total project</th>
                                        <th style="text-align: right;">Share price</th>
                                        <th style="text-align: right;">Starting balance</th>
                                        <th style="text-align: right;">Collection</th>
                                        <th style="text-align: right;">Expense</th>
                                        <th style="text-align: right;">Cash to bank</th>
                                        <th style="text-align: right;">Bank to cash</th>
                                        <th style="text-align: right;">Pending collection</th>
                                        <th style="text-align: right;">Pending expense</th>
                                        <th style="text-align: right;">Pending cash to bank</th>
                                        <th style="text-align: right;">Pending bank to cash</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr>
                                        <td style="text-align: right;"></td>
                                        <td>
                                            <a href="#" title="View details" target="_blank"></a>
                                        </td>
                                        <td>
                                            <a href="" title="View details" target="_blank"></a>
                                        </td>
                                        <td style="text-align: right;"></td>
                                        <td style="text-align: right;"></td>
                                        <td style="text-align: right;"></td>
                                        <td style="text-align: right;"></td>
                                        <td style="text-align: right;"></td>
                                        <td style="text-align: right;"></td>
                                        <td style="text-align: right;"></td>
                                        <td style="text-align: right;"></td>
                                        <td style="text-align: right;"></td>
                                        <td style="text-align: right;"></td>
                                        <td style="text-align: right;"></td>
                                        <td style="text-align: right;"></td>
                                        <td></td>
                                    </tr>
                                  
                                </tbody>
                            </table>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
            </div>
            <!-- /.row -->
        

           
            <div class="row">
                <div class="col-sm-6">
                    <!-- Widget: user widget style 2 -->
                    <div class="card card-widget widget-user-2">
                        <!-- Add the bg color to the header using any of the bg-* classes -->
                        <div class="widget-user-header bg-info">
                            <h3>Cash overview</h3>
                        </div>
                        <div class="card-footer p-0">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a href="#" class="nav-link">Collection <span class="float-right badge bg-primary">(+) </span></a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">Expense <span class="float-right badge bg-danger">(-) </span></a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">Bank to Cash <span class="float-right badge bg-primary">(+)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">Cash to Bank <span class="float-right badge bg-danger">(-) </span></a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">Pending collection <span class="float-right badge bg-warning"></span></a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">Pending expense <span class="float-right badge bg-warning"></span></a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">Pending Bank to Cash <span class="float-right badge bg-warning"></span></a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">Pending Cash to Bank <span class="float-right badge bg-warning"></span></a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link"><strong>Balance</strong> <span class="float-right badge bg-success"></span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- /.widget-user -->
                </div>

                <div class="col-sm-6">
                    <!-- Widget: user widget style 2 -->
                    <div class="card card-widget widget-user-2">
                        <!-- Add the bg color to the header using any of the bg-* classes -->
                        <div class="widget-user-header bg-info">
                            <h3>Bank overview</h3>
                        </div>
                        <div class="card-footer p-0">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a href="#" class="nav-link">Cash to Bank <span class="float-right badge bg-primary">(+) </span></a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">Bank to Cash <span class="float-right badge bg-danger">(-) </span></a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">Pending Cash to Bank <span class="float-right badge bg-warning"></span></a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">Pending Bank to Cash <span class="float-right badge bg-warning"></span></a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link"><strong>Balance</strong> <span class="float-right badge bg-success"></span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- /.widget-user -->
                </div>
            </div>
     
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->



<!--| JS start |-->
<script type="text/javascript">
    $(document).ready(function()
    {
        var table = $('#dataTable').DataTable({
            responsive: true,
            lengthChange: false,
            autoWidth: false,
            buttons: ["copy", "csv", "excel", "print", "colvis"]
        });

        table.buttons().container()
            .appendTo('#dataTable_wrapper .col-md-6:eq(0)');
    });
</script>
<!--| JS end |-->
