<!DOCTYPE html>
<html class="loading" lang="en">
<head>

    <title>Error 403</title>
    <link href="https://fonts.googleapis.com/css?family=Muli:300,300i,400,400i,600,600i,700,700i%7CComfortaa:300,400,700" rel="stylesheet">

    <!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset('assets/dist/vendors/css/vendors.min.css')}}">

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset('assets/dist/css2/bootstrap-extended.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/dist/css2/colors.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/dist/css2/components.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/dist/css2/bootstrap.min.css')}}">
    <!-- END: Theme CSS-->

    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset('assets/dist/css2/core/colors/palette-gradient.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/dist/css2/pages/error.min.css')}}">
    <!-- END: Page CSS-->


</head>
<!-- END: Head-->

<!-- BEGIN: Body-->
<body class="vertical-layout vertical-menu 1-column  bg-gradient-directional-danger blank-page blank-page" data-open="click" data-menu="vertical-menu" data-color="bg-gradient-x-purple-blue" data-col="1-column">
<!-- BEGIN: Content-->
<div class="app-content content">
    <div class="content-wrapper">
        <div class="content-wrapper-before"></div>
        <div class="content-header row">
        </div>
        <div class="content-body"><section class="flexbox-container bg-hexagons-danger">
                <div class="col-12 d-flex align-items-center justify-content-center">
                    <div class="col-lg-4 col-md-6 col-10 p-0">
                        <div class="card-header bg-transparent border-0">
                            <h2 class="error-code text-center mb-2 white">403</h2>
                            <h3 class="text-uppercase text-center white">Access Denied/Forbidden !</h3>
                        </div>
                        <div class="card-content">

                            <div class="row py-2 text-center">
                                <div class="col-12">
                                    @php
                                    if(auth()->user()->user_type == 1){
                                        $url="company";
                                    }else{
                                    $url="super";
                                    }
                                    @endphp
                                    <a href="/{{ $url }}" class="btn btn-white dark box-shadow-4 font-extrabold h3"><i class="ft-home"></i> Back to Page</a>
                                </div>

                            </div>
                        </div>
                        <div class="card-footer bg-transparent">
                            <div class="row">
                                <p class="text-muted text-center col-12 py-1 white">&copy; <span class="year">{{ date("Y") }}</span> <a href="#" class="white text-bold-700">Tech Makers BD </a></i> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </div>
</div>
<!-- END: Content-->



</body>
</html>