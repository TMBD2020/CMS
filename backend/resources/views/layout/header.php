<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><?php if(!empty($companyInfo['name'])){echo $companyInfo['name'].' | ';}else{if(!empty($templateData['title'])){echo $templateData['title'].' | ';}}?><?php if(!empty($pageTitle)){echo $pageTitle;}?></title>

        <!-- Google Font: Source Sans Pro -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
        <!-- Font Awesome Icons -->
        <link rel="stylesheet" href="{{asset('assets/plugins/fontawesome-free/css/all.min.css')}}">
        <!-- DataTables -->
        <link rel="stylesheet" href="{{asset('assets/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css')}}">
        <link rel="stylesheet" href="{{asset('assets/plugins/datatables-responsive/css/responsive.bootstrap4.min.css')}}">
        <link rel="stylesheet" href="{{asset('assets/plugins/datatables-buttons/css/buttons.bootstrap4.min.css')}}">
        <!-- Select2 -->
        <link rel="stylesheet" href="{{asset('assets/plugins/select2/css/select2.min.css')}}">
        <link rel="stylesheet" href="{{asset('assets/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css')}}">
        <!-- Theme style -->
        <link rel="stylesheet" href="{{asset('assets/dist/css/adminlte.min.css')}}">
        <!-- Toastr -->
        <link rel="stylesheet" href="{{asset('assets/plugins/toastr/toastr.min.css')}}">
        <!--| Date Picker |-->
        <link rel="stylesheet" href="{{asset('assets/plugins/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css')}}">
        <!-- pace-progress -->
        <link rel="stylesheet" href="{{asset('assets/plugins/pace-progress/themes/black/pace-theme-flat-top.css')}}">

        <!-- REQUIRED SCRIPTS -->
        <!-- jQuery -->
        <script src="{{asset('assets/plugins/jquery/jquery.min.js')}}"></script>
        <!-- Bootstrap 4 -->
        <script src="{{asset('assets/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
        <!-- Select2 -->
        <script src="{{asset('assets/plugins/select2/js/select2.full.min.js')}}"></script>
        <!-- DataTables  & Plugins -->
        <script src="{{asset('assets/plugins/datatables/jquery.dataTables.min.js')}}"></script>
        <script src="{{asset('assets/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js')}}"></script>
        <script src="{{asset('assets/plugins/datatables-responsive/js/dataTables.responsive.min.js')}}"></script>
        <script src="{{asset('assets/plugins/datatables-responsive/js/responsive.bootstrap4.min.js')}}"></script>
        <script src="{{asset('assets/plugins/datatables-buttons/js/dataTables.buttons.min.js')}}"></script>
        <script src="{{asset('assets/plugins/datatables-buttons/js/buttons.bootstrap4.min.js')}}"></script>
        <script src="{{asset('assets/plugins/jszip/jszip.min.js')}}"></script>
        <script src="{{asset('assets/plugins/pdfmake/pdfmake.min.js')}}"></script>
        <script src="{{asset('assets/plugins/pdfmake/vfs_fonts.js')}}"></script>
        <script src="{{asset('assets/plugins/datatables-buttons/js/buttons.html5.min.js')}}"></script>
        <script src="{{asset('assets/plugins/datatables-buttons/js/buttons.print.min.js')}}"></script>
        <script src="{{asset('assets/plugins/datatables-buttons/js/buttons.colVis.min.js')}}"></script>
        <!-- AdminLTE App -->
        <script src="{{asset('assets/dist/js/adminlte.min.js')}}"></script>
        <!-- SweetAlert2 -->
        <script src="{{asset('assets//plugins/sweetalert2/sweetalert2.min.js')}}"></script>
        <!-- Toastr -->
        <script src="{{asset('assets/plugins/toastr/toastr.min.js')}}"></script>
        <!--| Datepicker |-->
        <script src="{{asset('assets/plugins/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js')}}"></script>
        <!-- pace-progress -->
        <script src="{{asset('assets/plugins/pace-progress/pace.min.js')}}"></script>
    </head>
    <body class="hold-transition sidebar-mini layout-fixed pace-primary layout-navbar-fixed">
        <div class="wrapper">
            <!-- Preloader -->
            <div class="preloader flex-column justify-content-center align-items-center">
                <?php if(!empty($companyInfo['logo'])):?>
                <img class="animation__shake" src="{{asset('')}} assets/images/companiesLogo/<?php echo $companyInfo['logo'];?>" alt="Preloader logo" height="60" width="60">
                <?php else: ?>
                <?php if(!empty($templateData['logo'])):?>
                <img class="animation__shake" src="{{asset('')}} assets/images/<?php echo $templateData['logo'];?>" alt="Preloader logo" height="60" width="60">
                <?php endif; ?>
                <?php endif; ?>
            </div>
