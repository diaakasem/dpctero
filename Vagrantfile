# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure(2) do |config|
	# Base box to build off, and download URL for when it doesn't exist on the user's system already
	config.vm.box = "ubuntu/trusty32"
	config.vm.host_name = "elproff.host"
    config.vm.network "private_network", ip:"11.11.11.11"

    config.vm.provider "virtualbox" do |v|
          v.memory = 2048
          v.cpus = 2
          v.customize ["modifyvm", :id, "--cpuexecutioncap", "70"]
    end

	# Boot with a GUI so you can see the screen. (Default is headless)
	# config.vm.boot_mode = :gui

	# Forward a port from the guest to the host, which allows for outside
	# computers to access the VM, whereas host only networking does not.
    #
    # No Need for port forwarding, just add 33.33.33.33 to /etc/hosts
    # e.g 
    # 33.33.33.33 local.elproff.com
    # and then access the project from browser http://local.elproff.com
    # config.vm.network "forwarded_port", guest: 80, host: 8080

	# Share an additional folder to the guest VM. The first argument is
	# an identifier, the second is the path on the guest to mount the
	# folder, and the third is the path on the host to the actual folder.
    #
	# config.vm.synced_folder ".", "/home/vagrant/datashield"

    # Enable provisioning with a shell script.
    # config.vm.provision :shell, :path => "setup/dev/install.sh", :args => "seventy-seven"
    config.vm.provision :shell, :path => "setup/install.sh"

    # TODO: To use this lovely caching feature, please execute this command
    # vagrant plugin install vagrant-cachier
    if Vagrant.has_plugin?("vagrant-cachier")
        # Configure cached packages to be shared between instances of the same base box.
        # More info on http://fgrehm.viewdocs.io/vagrant-cachier/usage
        config.cache.scope = :box

        # OPTIONAL: If you are using VirtualBox, you might want to use that to enable
        # NFS for shared folders. This is also very useful for vagrant-libvirt if you
        # want bi-directional sync
        config.cache.synced_folder_opts = {
            type: :nfs,
            # The nolock option can be useful for an NFSv3 client that wants to avoid the
            # NLM sideband protocol. Without this option, apt-get might hang if it tries
            # to lock files needed for /var/cache/* operations. All of this can be avoided
            # by using NFSv4 everywhere. Please note that the tcp option is not the default.
            mount_options: ['rw', 'vers=3', 'tcp', 'nolock']
        }
        # For more information please check http://docs.vagrantup.com/v2/synced-folders/basic_usage.html
    end

end
