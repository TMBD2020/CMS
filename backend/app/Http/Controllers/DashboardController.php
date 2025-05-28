<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
	{
		if((in_array('viewUser', $this->permission)) || $this->session->userdata('userType') == "Super admin")
        {
            $this->data['totalUsers'] = $this->users_model->countTotalUsers();
        }

        if((in_array('viewMember', $this->permission) || in_array('updateMember', $this->permission)) || $this->session->userdata('userType') == "Super admin")
        {
            $this->data['totalMembers'] = $this->members_model->countTotalMembers();
        }

        if((in_array('viewEmployee', $this->permission) || in_array('updateEmployee', $this->permission)) || $this->session->userdata('userType') == "Super admin")
        {
            $this->data['totalEmployees'] = $this->employees_model->countTotalEmployees();
        }

        if($this->session->userdata('userType') == "Super admin")
        {
            $this->data['totalCompanies'] = $this->companies_model->countTotalCompanies();
        }

        if($this->session->userdata('userType') == "Super admin")
        {
            $this->data['totalPackages'] = $this->packages_model->countTotalPackages();
        }

        if((in_array('viewBankAccount', $this->permission) || in_array('updateBankAccount', $this->permission)) || $this->session->userdata('userType') == "Super admin")
        {
            $this->data['totalBankAccounts'] = $this->bankAccounts_model->countTotalBankAccounts();
        }

        if((in_array('viewProject', $this->permission) || in_array('updateProject', $this->permission)) || $this->session->userdata('userType') == "Super admin")
        {
            $this->data['totalProjects'] = $this->projects_model->countTotalProjects();
        }

        if($this->session->userdata('userType') == "Super admin")
        {
            $this->data['companiesData'] = $this->companies_model->getCompaniesData();

            if(!empty($this->data['companiesData']))
            {
            	foreach ($this->data['companiesData'] as $k => $v)
	            {
	            	$this->data['cashToBank'][$k] = 0;
	            	$this->data['pendingCashToBank'][$k] = 0;
	            	$this->data['bankToCash'][$k] = 0;
	            	$this->data['pendingBankToCash'][$k] = 0;
	            	$this->data['interest'][$k] = 0;
	            	$this->data['pendingInterest'][$k] = 0;
	            	$this->data['fee'][$k] = 0;
	            	$this->data['pendingFee'][$k] = 0;
	            	$this->data['collection'][$k] = 0;
	            	$this->data['pendingCollection'][$k] = 0;
	            	$this->data['expense'][$k] = 0;
	            	$this->data['pendingExpense'][$k] = 0;
	            	if(!empty($v['packageId']))
                    {
                        $this->data['packageData'][$k] = $this->packages_model->getPackagesData($v['packageId']);
                    }

                    $this->data['totalUser'][$k] = $this->users_model->countTotalUsers($v['id']);
                    $this->data['totalProject'][$k] = $this->projects_model->countTotalProjects($v['id']);

	                $accountData = $this->accounts_model->getAccountsData(null, null, null, null, null, $v['id']);

	                if(!empty($accountData))
	                {
	                	foreach($accountData as $k2 => $v2)
	                	{
	                		if(!empty($v2['bankAccountId']))
			                {
			                    if(!empty($v2['transferType']))
			                    {
			                        if($v2['transferType'] == "Cash to Bank")
			                        {
			                            if(!empty($v2['amount']))
			                            {
			                            	if($v2['status'] == 1)
			                            	{
			                            		$this->data['cashToBank'][$k] = $this->data['cashToBank'][$k] + $v2['amount'];
			                            	}
			                            	else
			                            	{
			                            		$this->data['pendingCashToBank'][$k] = $this->data['pendingCashToBank'][$k] + $v2['amount'];
			                            	}
			                                
			                            }
			                        }
			                        if($v2['transferType'] == "Bank to Cash")
			                        {
			                            if(!empty($v2['amount']))
			                            {
			                            	if($v2['status'] == 1)
			                            	{
			                            		$this->data['bankToCash'][$k] = $this->data['bankToCash'][$k] + $v2['amount'];
			                            	}
			                            	else
			                            	{
			                            		$this->data['pendingBankToCash'][$k] = $this->data['pendingBankToCash'][$k] + $v2['amount'];
			                            	}
			                            }
			                        }
			                    }

			                    if(!empty($v2['bankInterestFeeId']))
			                    {
			                        if($v2['interestFeeType'] == "Interest")
			                        {
			                            if(!empty($v2['amount']))
			                            {
			                            	if($v2['status'] == 1)
			                            	{
			                            		$this->data['interest'][$k] = $this->data['interest'][$k] + $v2['amount'];
			                            	}
			                            	else
			                            	{
			                            		$this->data['pendingInterest'][$k] = $this->data['pendingInterest'][$k] + $v2['amount'];
			                            	}
			                            }
			                        }
			                        else
			                        {
			                            if(!empty($v2['amount']))
			                            {
			                            	if($v2['status'] == 1)
			                            	{
			                            		$this->data['fee'][$k] = $this->data['fee'][$k] + $v2['amount'];
			                            	}
			                            	else
			                            	{
			                            		$this->data['pendingFee'][$k] = $this->data['pendingFee'][$k] + $v2['amount'];
			                            	}
			                                
			                            }
			                        }
			                    }
			                }

			                if($v2['intro'] == "in")
			                {
			                    if(!empty($v2['amount']))
			                    {
			                    	if($v2['status'] == 1)
			                    	{
			                    		$this->data['collection'][$k] = $this->data['collection'][$k] + $v2['amount'];
			                    	}
			                    	else
			                    	{
			                    		$this->data['pendingCollection'][$k] = $this->data['pendingCollection'][$k] + $v2['amount'];
			                    	}
			                    }
			                }
			                if($v2['intro'] == "out")
			                {
			                    if(!empty($v2['amount']))
			                    {
			                    	if($v2['status'] == 1)
			                    	{
			                    		$this->data['expense'][$k] = $this->data['expense'][$k] + $v2['amount'];
			                    	}
			                    	else
			                    	{
			                    		$this->data['pendingExpense'][$k] = $this->data['pendingExpense'][$k] + $v2['amount'];
			                    	}
			                        
			                    }
			                }
	                	}
	                }
	            }
            }
        }


        if(in_array('viewAccount', $this->permission) || $this->session->userdata('userType') == "Super admin")
        {
            $this->data['accountData'] = $this->accounts_model->getAccountsData();

            $this->data['accountCashToBank'] = 0;
        	$this->data['accountPendingCashToBank'] = 0;
        	$this->data['accountBankToCash'] = 0;
        	$this->data['accountPendingBankToCash'] = 0;
        	$this->data['accountInterest'] = 0;
        	$this->data['accountPendingInterest'] = 0;
        	$this->data['accountFee'] = 0;
        	$this->data['accountPendingFee'] = 0;
        	$this->data['accountCollection'] = 0;
        	$this->data['accountPendingCollection'] = 0;
        	$this->data['accountExpense'] = 0;
        	$this->data['accountPendingExpense'] = 0;

            if(!empty($this->data['accountData']))
            {
            	foreach ($this->data['accountData'] as $k => $v)
	            {
            		if(!empty($v['bankAccountId']))
	                {
	                    if(!empty($v['transferType']))
	                    {
	                        if($v['transferType'] == "Cash to Bank")
	                        {
	                            if(!empty($v['amount']))
	                            {
	                            	if($v['status'] == 1)
	                            	{
	                            		$this->data['accountCashToBank'] = $this->data['accountCashToBank'] + $v['amount'];
	                            	}
	                            	else
	                            	{
	                            		$this->data['accountPendingCashToBank'] = $this->data['accountPendingCashToBank'] + $v['amount'];
	                            	}
	                            }
	                        }

	                        if($v['transferType'] == "Bank to Cash")
	                        {
	                            if(!empty($v['amount']))
	                            {
	                            	if($v['status'] == 1)
	                            	{
	                            		$this->data['accountBankToCash'] = $this->data['accountBankToCash'] + $v['amount'];
	                            	}
	                            	else
	                            	{
	                            		$this->data['accountPendingBankToCash'] = $this->data['accountPendingBankToCash'] + $v['amount'];
	                            	}
	                            }
	                        }
	                    }

	                    if(!empty($v['bankInterestFeeId']))
	                    {
	                        if($v['interestFeeType'] == "Interest")
	                        {
	                            if(!empty($v['amount']))
	                            {
	                            	if($v['status'] == 1)
	                            	{
	                            		$this->data['accountInterest'] = $this->data['accountInterest'] + $v['amount'];
	                            	}
	                            	else
	                            	{
	                            		$this->data['accountPendingInterest'] = $this->data['accountPendingInterest'] + $v['amount'];
	                            	}
	                            }
	                        }
	                        else
	                        {
	                            if(!empty($v['amount']))
	                            {
	                            	if($v['status'] == 1)
	                            	{
	                            		$this->data['accountFee'] = $this->data['accountFee'] + $v['amount'];
	                            	}
	                            	else
	                            	{
	                            		$this->data['accountPendingFee'] = $this->data['accountPendingFee'] + $v['amount'];
	                            	}
	                                
	                            }
	                        }
	                    }
	                }

	                if($v['intro'] == "in")
	                {
	                    if(!empty($v['amount']))
	                    {
	                    	if($v['status'] == 1)
	                    	{
	                    		$this->data['accountCollection'] = $this->data['accountCollection'] + $v['amount'];
	                    	}
	                    	else
	                    	{
	                    		$this->data['accountPendingCollection'] = $this->data['accountPendingCollection'] + $v['amount'];
	                    	}
	                    }
	                }
	                if($v['intro'] == "out")
	                {
	                    if(!empty($v['amount']))
	                    {
	                    	if($v['status'] == 1)
	                    	{
	                    		$this->data['accountExpense'] = $this->data['accountExpense'] + $v['amount'];
	                    	}
	                    	else
	                    	{
	                    		$this->data['accountPendingExpense'] = $this->data['accountPendingExpense'] + $v['amount'];
	                    	}
	                        
	                    }
	                }
	            }
            }
        }

		$this->data['pageTitle'] = 'Dashboard';
		$this->loadView('dashboard', $this->data);
	}

}
