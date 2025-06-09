// 主JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 表单实时预览
    const nameInput = document.getElementById('name');
    const universityInput = document.getElementById('university');
    const majorInput = document.getElementById('major');
    const templateSelect = document.getElementById('template');
    
    const previewName = document.getElementById('preview-name');
    const previewUniversity = document.getElementById('preview-university');
    const previewMajor = document.getElementById('preview-major');
    const previewUniversityStamp = document.getElementById('preview-university-stamp');
    const admissionLetter = document.querySelector('.admission-letter');

    // 更新预览函数
    function updatePreview() {
        if (nameInput && previewName) {
            previewName.textContent = nameInput.value || '张三';
        }
        
        if (universityInput && previewUniversity && previewUniversityStamp) {
            const universityValue = universityInput.value || '北京大学';
            previewUniversity.textContent = universityValue;
            previewUniversityStamp.textContent = universityValue;
            
            // 动态更新印章中的大学名称
            updateSealWithUniversityName(universityValue);
        }
        
        if (majorInput && previewMajor) {
            previewMajor.textContent = majorInput.value || '计算机科学与技术';
        }

        if (templateSelect && admissionLetter) {
            // 移除所有模板类
            admissionLetter.classList.remove('template-classic', 'template-modern', 'template-elegant');
            // 添加选中的模板类
            admissionLetter.classList.add(`template-${templateSelect.value}`);
            
            // 更新背景图
            admissionLetter.style.backgroundImage = `url('../images/certificate-bg-${templateSelect.value}.svg')`;
            
            // 根据模板调整文字颜色和边框颜色
            const textElements = admissionLetter.querySelectorAll('.text-red-700');
            let textColor = '#dc2626'; // 默认红色
            
            switch(templateSelect.value) {
                case 'modern':
                    textColor = '#2563eb'; // 蓝色
                    break;
                case 'elegant':
                    textColor = '#92400e'; // 金色
                    break;
            }
            
            textElements.forEach(el => {
                el.style.color = textColor;
            });
        }
    }

    // 动态更新印章中的大学名称
    function updateSealWithUniversityName(universityName) {
        // 获取印章图片元素
        const sealImg = document.querySelector('.admission-letter img');
        if (!sealImg) return;
        
        // 创建动态SVG印章
        const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
          <!-- 外圆 -->
          <circle cx="100" cy="100" r="95" fill="none" stroke="#c00" stroke-width="2"/>
          
          <!-- 内圆 -->
          <circle cx="100" cy="100" r="85" fill="none" stroke="#c00" stroke-width="1.5"/>
          
          <!-- 五角星 -->
          <path d="M100 30 L113 70 L155 70 L120 95 L135 135 L100 110 L65 135 L80 95 L45 70 L87 70 Z" fill="#c00"/>
          
          <!-- 上部文字 -->
          <path id="upperText" d="M100,25 A75,75 0 0,1 175,100" fill="none" />
          <text>
            <textPath href="#upperText" startOffset="50%" text-anchor="middle" font-family="SimSun, serif" font-size="12" fill="#c00">${universityName}</textPath>
          </text>
          
          <!-- 下部文字 -->
          <path id="lowerText" d="M100,175 A75,75 0 0,1 25,100" fill="none" />
          <text>
            <textPath href="#lowerText" startOffset="50%" text-anchor="middle" font-family="SimSun, serif" font-size="12" fill="#c00">招生办公室</textPath>
          </text>
          
          <!-- 左侧文字 -->
          <path id="leftText" d="M25,100 A75,75 0 0,1 100,25" fill="none" />
          <text>
            <textPath href="#leftText" startOffset="50%" text-anchor="middle" font-family="SimSun, serif" font-size="12" fill="#c00">ADMISSION</textPath>
          </text>
          
          <!-- 右侧文字 -->
          <path id="rightText" d="M175,100 A75,75 0 0,1 100,175" fill="none" />
          <text>
            <textPath href="#rightText" startOffset="50%" text-anchor="middle" font-family="SimSun, serif" font-size="12" fill="#c00">OFFICE</textPath>
          </text>
        </svg>
        `;
        
        // 将SVG转换为Base64编码的数据URL
        const svgBlob = new Blob([svgContent], {type: 'image/svg+xml'});
        const reader = new FileReader();
        
        reader.onload = function(e) {
            sealImg.src = e.target.result;
        };
        
        reader.readAsDataURL(svgBlob);
    }

    // 添加输入事件监听器
    if (nameInput) nameInput.addEventListener('input', updatePreview);
    if (universityInput) universityInput.addEventListener('input', updatePreview);
    if (majorInput) majorInput.addEventListener('input', updatePreview);
    if (templateSelect) templateSelect.addEventListener('change', updatePreview);

    // 表单提交处理
    const admissionForm = document.getElementById('admission-form');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 添加生成动画
            const preview = document.getElementById('preview');
            if (preview) {
                preview.classList.add('animate-pulse');
                
                // 模拟生成过程
                setTimeout(() => {
                    preview.classList.remove('animate-pulse');
                    
                    // 显示成功消息
                    showNotification('通知书生成成功！', 'success');
                    
                    // 添加下载和分享按钮
                    addActionButtons();
                }, 1500);
            }
        });
    }

    // 添加下载和分享按钮
    function addActionButtons() {
        const preview = document.getElementById('preview');
        if (!preview) return;
        
        // 检查是否已经添加了按钮
        if (document.querySelector('.action-buttons')) return;
        
        const actionButtons = document.createElement('div');
        actionButtons.className = 'action-buttons flex justify-center space-x-4 mt-6 animate-fade-in-up';
        actionButtons.innerHTML = `
            <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center">
                <i class="fas fa-download mr-2"></i> 下载通知书
            </button>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center">
                <i class="fas fa-share-alt mr-2"></i> 分享
            </button>
        `;
        
        preview.parentNode.appendChild(actionButtons);
        
        // 添加按钮点击事件
        const downloadBtn = actionButtons.querySelector('button:first-child');
        const shareBtn = actionButtons.querySelector('button:last-child');
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function() {
                // 显示加载中通知
                showNotification('正在生成通知书图片...', 'info');
                
                // 获取通知书元素
                const admissionLetter = document.querySelector('.admission-letter');
                
                if (!admissionLetter) {
                    showNotification('无法找到通知书元素', 'error');
                    return;
                }
                
                // 创建通知书的克隆版本用于导出
                const letterClone = admissionLetter.cloneNode(true);
                letterClone.style.transform = 'none'; // 移除旋转
                letterClone.style.boxShadow = 'none'; // 移除阴影
                letterClone.style.position = 'fixed';
                letterClone.style.left = '-9999px';
                letterClone.style.top = '0';
                document.body.appendChild(letterClone);
                
                // 获取印章图片元素
                const sealImg = letterClone.querySelector('img');
                
                // 确保印章图片已加载完成
                const processSealAndGenerateImage = function() {
                    // 使用html2canvas将通知书转换为图片
                    html2canvas(letterClone, {
                        scale: 3, // 提高图片质量
                        backgroundColor: null, // 保持背景透明
                        logging: false, // 关闭日志
                        useCORS: true, // 允许跨域图片
                        allowTaint: true, // 允许污染画布
                        onclone: function(clonedDoc) {
                            // 获取克隆的通知书元素
                            const clonedLetter = clonedDoc.querySelector('.admission-letter');
                            
                            // 确保背景图片完全加载
                            const bgImg = new Image();
                            bgImg.src = window.getComputedStyle(admissionLetter).backgroundImage.replace(/url\(['"]*([^'"]*)['"]*/g, '$1');
                            
                            // 确保SVG背景正确渲染
                            clonedLetter.style.backgroundImage = `url(${bgImg.src})`;
                            clonedLetter.style.backgroundSize = 'cover';
                            clonedLetter.style.backgroundPosition = 'center';
                            clonedLetter.style.backgroundRepeat = 'no-repeat';
                            
                            // 确保文字样式正确应用
                            const textElements = clonedLetter.querySelectorAll('.text-red-700');
                            const templateValue = document.getElementById('template').value;
                            let textColor = '#dc2626'; // 默认红色
                            
                            switch(templateValue) {
                                case 'modern':
                                    textColor = '#2563eb'; // 蓝色
                                    break;
                                case 'elegant':
                                    textColor = '#92400e'; // 金色
                                    break;
                            }
                            
                            textElements.forEach(el => {
                                el.style.color = textColor;
                            });
                            
                            // 确保印章正确显示
                            const stamp = clonedLetter.querySelector('img');
                            if (stamp) {
                                // 获取原始印章的src
                                const originalStamp = document.querySelector('.admission-letter img');
                                if (originalStamp) {
                                    stamp.src = originalStamp.src; // 复制动态生成的印章
                                }
                                stamp.style.opacity = '0.9';
                                stamp.style.width = '100%';
                                stamp.style.height = '100%';
                                stamp.style.objectFit = 'contain';
                            }
                            
                            // 确保字体已加载
                            clonedLetter.style.fontFamily = "'SimSun', 'STSong', serif";
                            
                            // 确保所有文本元素样式正确
                            const allTextElements = clonedLetter.querySelectorAll('p, div, span');
                            allTextElements.forEach(el => {
                                el.style.fontFamily = "'SimSun', 'STSong', serif";
                                el.style.lineHeight = '1.6';
                                el.style.letterSpacing = '0.05em';
                            });
                        }
                    }).then(function(canvas) {
                        try {
                            // 将canvas转换为图片URL
                            const imgData = canvas.toDataURL('image/png');
                            
                            // 创建下载链接
                            const downloadLink = document.createElement('a');
                            
                            // 设置文件名
                            const studentName = document.getElementById('preview-name').textContent || '同学';
                            const universityName = document.getElementById('preview-university').textContent || '大学';
                            const fileName = `${studentName}-${universityName}录取通知书.png`;
                            
                            downloadLink.href = imgData;
                            downloadLink.download = fileName;
                            
                            // 添加到文档并触发点击
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            
                            // 清理DOM
                            setTimeout(() => {
                                document.body.removeChild(downloadLink);
                                // 清理临时创建的克隆元素
                                if (document.body.contains(letterClone)) {
                                    document.body.removeChild(letterClone);
                                }
                            }, 100);
                            
                            showNotification('通知书已成功下载！', 'success');
                        } catch (error) {
                            console.error('下载失败:', error);
                            showNotification('下载失败，请重试', 'error');
                            // 出错时也要清理克隆元素
                            if (document.body.contains(letterClone)) {
                                document.body.removeChild(letterClone);
                            }
                        }
                    }).catch(function(error) {
                        console.error('生成图片失败:', error);
                        showNotification('生成图片失败，请重试', 'error');
                        // 清理临时创建的克隆元素
                        if (document.body.contains(letterClone)) {
                            document.body.removeChild(letterClone);
                        }
                    });
                };
                
                // 检查印章图片是否已加载
                if (sealImg && !sealImg.complete) {
                    // 如果印章图片未加载完成，添加加载完成事件监听器
                    sealImg.onload = processSealAndGenerateImage;
                } else {
                    // 如果印章图片已加载完成或不存在，直接处理
                    processSealAndGenerateImage();
                }
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', function() {
                showShareOptions();
            });
        }
    }

    // 显示分享选项
    function showShareOptions() {
        // 检查是否已经显示了分享选项
        if (document.querySelector('.share-options')) return;
        
        // 首先尝试使用Web Share API（如果浏览器支持）
        if (navigator.share) {
            // 生成通知书图片
            generateCertificateImage().then(imgData => {
                // 准备分享数据
                const studentName = document.getElementById('preview-name').textContent || '同学';
                const universityName = document.getElementById('preview-university').textContent || '大学';
                
                navigator.share({
                    title: `${studentName}的${universityName}录取通知书`,
                    text: `我被${universityName}录取啦！快来看看我的录取通知书吧！`,
                    url: window.location.href
                }).then(() => {
                    showNotification('分享成功！', 'success');
                }).catch(error => {
                    console.error('分享失败:', error);
                    // 如果Web Share API失败，回退到传统分享方式
                    showTraditionalShareOptions(imgData);
                });
            }).catch(error => {
                console.error('生成图片失败:', error);
                showNotification('生成分享图片失败，请重试', 'error');
                // 如果图片生成失败，仍然显示传统分享选项，但没有图片
                showTraditionalShareOptions();
            });
        } else {
            // 浏览器不支持Web Share API，使用传统分享方式
            generateCertificateImage().then(imgData => {
                showTraditionalShareOptions(imgData);
            }).catch(error => {
                console.error('生成图片失败:', error);
                showNotification('生成分享图片失败，请重试', 'error');
                showTraditionalShareOptions();
            });
        }
    }
    
    // 生成通知书图片
    function generateCertificateImage() {
        return new Promise((resolve, reject) => {
            // 获取通知书元素
            const admissionLetter = document.querySelector('.admission-letter');
            
            if (!admissionLetter) {
                reject(new Error('无法找到通知书元素'));
                return;
            }
            
            // 创建通知书的克隆版本用于导出
            const letterClone = admissionLetter.cloneNode(true);
            letterClone.style.transform = 'none'; // 移除旋转
            letterClone.style.boxShadow = 'none'; // 移除阴影
            letterClone.style.position = 'fixed';
            letterClone.style.left = '-9999px';
            letterClone.style.top = '0';
            document.body.appendChild(letterClone);
            
            // 获取印章图片元素
            const sealImg = letterClone.querySelector('img');
            
            // 确保印章图片已加载完成的处理函数
            const processAndGenerateImage = function() {
                html2canvas(letterClone, {
                    scale: 3, // 提高图片质量
                    backgroundColor: null, // 保持背景透明
                    logging: false, // 关闭日志
                    useCORS: true, // 允许跨域图片
                    allowTaint: true, // 允许污染画布
                    onclone: function(clonedDoc) {
                        // 获取克隆的通知书元素
                        const clonedLetter = clonedDoc.querySelector('.admission-letter');
                        
                        // 确保背景图片完全加载
                        const bgImg = new Image();
                        bgImg.src = window.getComputedStyle(admissionLetter).backgroundImage.replace(/url\(['"]*([^'"]*)['"]*/g, '$1');
                        
                        // 确保SVG背景正确渲染
                        clonedLetter.style.backgroundImage = `url(${bgImg.src})`;
                        clonedLetter.style.backgroundSize = 'cover';
                        clonedLetter.style.backgroundPosition = 'center';
                        clonedLetter.style.backgroundRepeat = 'no-repeat';
                        
                        // 确保文字样式正确应用
                        const textElements = clonedLetter.querySelectorAll('.text-red-700');
                        const templateValue = document.getElementById('template').value;
                        let textColor = '#dc2626'; // 默认红色
                        
                        switch(templateValue) {
                            case 'modern':
                                textColor = '#2563eb'; // 蓝色
                                break;
                            case 'elegant':
                                textColor = '#92400e'; // 金色
                                break;
                        }
                        
                        textElements.forEach(el => {
                            el.style.color = textColor;
                        });
                        
                        // 确保印章正确显示
                        const stamp = clonedLetter.querySelector('img');
                        if (stamp) {
                            // 获取原始印章的src
                            const originalStamp = document.querySelector('.admission-letter img');
                            if (originalStamp) {
                                stamp.src = originalStamp.src; // 复制动态生成的印章
                            }
                            stamp.style.opacity = '0.9';
                            stamp.style.width = '100%';
                            stamp.style.height = '100%';
                            stamp.style.objectFit = 'contain';
                        }
                        
                        // 确保字体已加载
                        clonedLetter.style.fontFamily = "'SimSun', 'STSong', serif";
                        
                        // 确保所有文本元素样式正确
                        const allTextElements = clonedLetter.querySelectorAll('p, div, span');
                        allTextElements.forEach(el => {
                            el.style.fontFamily = "'SimSun', 'STSong', serif";
                            el.style.lineHeight = '1.6';
                            el.style.letterSpacing = '0.05em';
                        });
                    }
                }).then(function(canvas) {
                    try {
                        // 将canvas转换为图片URL
                        const imgData = canvas.toDataURL('image/png');
                        
                        // 清理临时创建的克隆元素
                        if (document.body.contains(letterClone)) {
                            document.body.removeChild(letterClone);
                        }
                        
                        resolve(imgData);
                    } catch (error) {
                        console.error('转换图片失败:', error);
                        // 清理临时创建的克隆元素
                        if (document.body.contains(letterClone)) {
                            document.body.removeChild(letterClone);
                        }
                        reject(error);
                    }
                }).catch(function(error) {
                    console.error('生成图片失败:', error);
                    // 清理临时创建的克隆元素
                    if (document.body.contains(letterClone)) {
                        document.body.removeChild(letterClone);
                    }
                    reject(error);
                });
            };
            
            // 检查印章图片是否已加载
            if (sealImg && !sealImg.complete) {
                // 如果印章图片未加载完成，添加加载完成事件监听器
                sealImg.onload = processAndGenerateImage;
            } else {
                // 如果印章图片已加载完成或不存在，直接处理
                processAndGenerateImage();
            }
        });
    }
    
    // 显示传统分享选项
    function showTraditionalShareOptions(imgData) {
        const shareOptions = document.createElement('div');
        shareOptions.className = 'share-options fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        
        // 获取分享信息
        const studentName = document.getElementById('preview-name').textContent || '同学';
        const universityName = document.getElementById('preview-university').textContent || '大学';
        const shareTitle = `${studentName}的${universityName}录取通知书`;
        const shareDesc = `我被${universityName}录取啦！快来看看我的录取通知书吧！`;
        const shareUrl = encodeURIComponent(window.location.href);
        
        // 构建分享链接
        const weiboUrl = `https://service.weibo.com/share/share.php?url=${shareUrl}&title=${encodeURIComponent(shareDesc)}`;
        const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${shareUrl}&title=${encodeURIComponent(shareTitle)}&desc=${encodeURIComponent(shareDesc)}`;
        
        shareOptions.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md w-full">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-gray-800">分享到</h3>
                    <button class="text-gray-500 hover:text-gray-700 focus:outline-none close-share">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="grid grid-cols-4 gap-4 mb-6">
                    <button class="share-wechat flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 transition duration-300">
                        <i class="fab fa-weixin text-2xl text-green-600"></i>
                        <span class="mt-2 text-sm">微信</span>
                    </button>
                    <button class="share-weibo flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 transition duration-300">
                        <i class="fab fa-weibo text-2xl text-red-600"></i>
                        <span class="mt-2 text-sm">微博</span>
                    </button>
                    <button class="share-qq flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 transition duration-300">
                        <i class="fab fa-qq text-2xl text-blue-600"></i>
                        <span class="mt-2 text-sm">QQ</span>
                    </button>
                    <button class="share-link flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 transition duration-300">
                        <i class="fas fa-link text-2xl text-gray-600"></i>
                        <span class="mt-2 text-sm">复制链接</span>
                    </button>
                </div>
                ${imgData ? `
                <div class="mb-4 text-center">
                    <p class="text-sm text-gray-600 mb-2">长按图片保存，或截图分享</p>
                    <div class="inline-block border border-gray-300 rounded p-2">
                        <img src="${imgData}" alt="录取通知书" class="max-w-full h-auto" style="max-height: 200px;">
                    </div>
                </div>` : ''}
                <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 close-share">
                    取消
                </button>
            </div>
        `;
        
        document.body.appendChild(shareOptions);
        document.body.style.overflow = 'hidden';
        
        // 添加关闭事件
        const closeButtons = shareOptions.querySelectorAll('.close-share');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                document.body.removeChild(shareOptions);
                document.body.style.overflow = '';
            });
        });
        
        // 添加微信分享事件
        const wechatBtn = shareOptions.querySelector('.share-wechat');
        if (wechatBtn) {
            wechatBtn.addEventListener('click', function() {
                // 显示微信分享提示
                const currentShareOptions = document.querySelector('.share-options');
                if (currentShareOptions) {
                    document.body.removeChild(currentShareOptions);
                }
                
                const wechatTips = document.createElement('div');
                wechatTips.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                wechatTips.innerHTML = `
                    <div class="bg-white rounded-lg p-6 max-w-md w-full text-center">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">微信分享</h3>
                        <p class="mb-4">请截图后，打开微信选择相册图片分享给朋友</p>
                        ${imgData ? `<div class="mb-4 inline-block border border-gray-300 rounded p-2">
                            <img src="${imgData}" alt="录取通知书" class="max-w-full h-auto" style="max-height: 200px;">
                        </div>` : ''}
                        <button class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 close-wechat">
                            我知道了
                        </button>
                    </div>
                `;
                
                document.body.appendChild(wechatTips);
                
                const closeWechatBtn = wechatTips.querySelector('.close-wechat');
                if (closeWechatBtn) {
                    closeWechatBtn.addEventListener('click', function() {
                        document.body.removeChild(wechatTips);
                        document.body.style.overflow = '';
                    });
                }
            });
        }
        
        // 添加微博分享事件
        const weiboBtn = shareOptions.querySelector('.share-weibo');
        if (weiboBtn) {
            weiboBtn.addEventListener('click', function() {
                window.open(weiboUrl, '_blank');
                document.body.removeChild(shareOptions);
                document.body.style.overflow = '';
                showNotification('已打开微博分享页面', 'success');
            });
        }
        
        // 添加QQ分享事件
        const qqBtn = shareOptions.querySelector('.share-qq');
        if (qqBtn) {
            qqBtn.addEventListener('click', function() {
                window.open(qqUrl, '_blank');
                document.body.removeChild(shareOptions);
                document.body.style.overflow = '';
                showNotification('已打开QQ分享页面', 'success');
            });
        }
        
        // 添加复制链接事件
        const linkBtn = shareOptions.querySelector('.share-link');
        if (linkBtn) {
            linkBtn.addEventListener('click', function() {
                // 创建临时输入框
                const tempInput = document.createElement('input');
                tempInput.value = window.location.href;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                showNotification('链接已复制到剪贴板', 'success');
                document.body.removeChild(shareOptions);
                document.body.style.overflow = '';
            });
        }
    }

    // 显示通知消息
    function showNotification(message, type = 'info') {
        // 移除现有通知
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            document.body.removeChild(existingNotification);
        }
        
        // 根据类型设置样式
        let bgColor = 'bg-blue-500';
        let icon = 'fas fa-info-circle';
        
        switch(type) {
            case 'success':
                bgColor = 'bg-green-500';
                icon = 'fas fa-check-circle';
                break;
            case 'error':
                bgColor = 'bg-red-500';
                icon = 'fas fa-exclamation-circle';
                break;
            case 'warning':
                bgColor = 'bg-yellow-500';
                icon = 'fas fa-exclamation-triangle';
                break;
        }
        
        // 创建新通知
        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-fade-in-up ${bgColor} text-white`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="${icon} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 自动关闭通知
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            notification.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }

    // 滚动动画
    const sections = document.querySelectorAll('section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('fade-in-section', 'is-visible');
            }
        });
    }
    
    // 初始检查
    checkScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', checkScroll);

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 关闭移动端菜单（如果打开）
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });

    // 设置当前日期
    const previewDate = document.getElementById('preview-date');
    if (previewDate) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        previewDate.textContent = `${year}年${month}月${day}日`;
    }

    // 初始化页面
    updatePreview();
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });
    checkScroll();
});