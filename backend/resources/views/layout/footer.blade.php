
            <!-- Main Footer -->
            <footer class="main-footer mt-0">
                <!-- To the right -->
                <div class="float-right d-none d-sm-inline">
                    {{ config('constants.development.session') }} &copy; {{ config('constants.software.name') }} Developed by <a href="{{ config('constants.developer.url') }}" target="_blank">TMBD</a>
                </div>
                <!-- Default to the left -->
                <span class="float-md-left d-block d-md-inline-block">{{ date("Y") }}  &copy; Copyright <a class="text-bold-800 grey darken-2" href="//techmakersbd.com/" target="_blank">Tech Makers BD</a></span>
            </footer>
        </div>
        <!-- ./wrapper -->

        <script type="text/javascript">
            // For adding active class
            var url = window.location;

            // for sidebar menu entirely but not cover treeview
            $('ul.nav-sidebar a').filter(function() {
                return this.href == url;
            }).addClass('active');

            // for treeview
            $('ul.nav-treeview a').filter(function() {
                return this.href == url;
            }).parentsUntil(".nav-sidebar > .nav-treeview").addClass('menu-open').prev('a').addClass('active');

            // alert message hide
            setTimeout(function()
            {
                $(".toast").fadeOut("slow", function()
                {
                    $(".toast").remove();
                });
            }, 10000);
        </script>

        
    </body>
</html>