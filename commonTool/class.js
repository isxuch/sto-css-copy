/**
 * 公共常用方法类封装  
 * sto--xianxin
 */
class commonTool {
    constructor() {
        this.startAction = () => {
            let selectList = Array.from(document.getElementsByTagName("select"))
            return new Promise((resolve, reject) => {
                resolve(selectList)
            })
        }
        this.centerAction = (ele, mm) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(ele)
                }, mm)
            })
        }
    }
    /**
     * 动态改变时间框 宽度
     * @ inputName 表单  'name' 值
     * @ width  需要设定的表单宽度
     */
    changeTimeBoxWidth = (inputName = 'create_date', width = 300) => {
        $('input[name=' + inputName + ']').change(function () {
            var el = $('input[name=' + inputName + ']');
            setTimeout(function () {
                if (el.val()) {
                    el.parent().prop('style', 'width:' + width + 'px')
                } else {
                    el.parent().prop('style', '')
                }
            }, 200)
        })
    }

    /**
     * 文件上传  纯净版  只包含前端页面结构 不涉及交互逻辑
     * @ obj.confirmText 确定按钮文案
     * @ obj.cancelText 取消按钮文案
     * @ obj.uploadText 可以上传的文件格式提示
     * @ downloadUrl 模板下载连接
     */

    uploadLayOut = (obj) => {
        let layOutStr = `
        <div class="layui-form">
            <div class="upload-item">
                <label class="layui-form-label">选择文件:</label>
                <div class="file-name-box" id="fileNameBox">请选择文件导入</div>
                <button type="button" class="upload-btn layui-btn layui-btn-h35" id="checkFile">选择文件</button>
            </div>
            <div class="upload-item">
                <label class="layui-form-label"></label>
                <a href="${obj.downloadUrl}" class="text-span">点击下载模板文件</a>
            </div>
            <div class="upload-item">
                <label class="layui-form-label"></label>
                <div>提示：支持的上传文件后缀名为：${obj.uploadText?obj.uploadText:'XLS、XLSX'}</div>
            </div>
            <div class="upload-item upload-mt10">
                <label class="layui-form-label"></label>
                <button type="button" class="layui-btn layui-btn-h35" id="doSubmit">${obj.confirmText?obj.confirmText:'确定'}</button>
                <button type="button" class="layui-btn layui-btn-minor-h35" id="doCancel">${obj.cancelText?obj.cancelText:'取消'}</button>
            </div>
        </div>
        `;
        return layOutStr;
    }

    /**
     * 给select下拉框开启搜索功能
     */

    laySelectSearch = () => {
        this.startAction().then((data) => {
            for (let i of data) {
                // 非指定不开启  全都给上搜索功能
                if (!i.getAttribute('no-search')) {
                    i.setAttribute("lay-search", "")
                }
                // 更改提示文案
                if (i.children[0].innerHTML == "请选择" && i.getAttribute("lay-search") != null) {
                    i.children[0].innerHTML = "选择或输入";
                }
                // 获取input元素
                this.centerAction(i, 200).then((data) => {
                    if (i.getAttribute("multiple") != null) {
                        i.setAttribute("lay-omit", "")
                        let multiSelect = $(data).siblings('.layui-form-select').find('.multiSelect');
                        let iEle = multiSelect.find('i');
                        let dl = $(data).siblings('.layui-form-select').find('dl');
                        multiSelect.click(function () {
                            if (dl.css('display') == 'none') {
                                iEle.removeClass().addClass("layui-icon layui-icon-search search-position-2");
                            } else {
                                iEle.removeClass().addClass("layui-edge");
                            }
                            $(document).click(function (e) {
                                if (e.target != multiSelect) {
                                    iEle.removeClass().addClass("layui-edge");
                                }
                            })
                        });
                    } else {
                        let inputEle = $(data).siblings('.layui-form-select').find('input.layui-input[type="text"]');
                        let iEle = $(data).siblings('.layui-form-select').find('i');
                        // 获得焦点
                        inputEle.focus(() => {
                            setTimeout(() => {
                                iEle.removeClass().addClass("layui-icon layui-icon-search search-position");
                                if (inputEle.val()) {
                                    inputEle.attr('placeholder', inputEle.val()).val('');
                                }
                            }, 300)
                        });
                        // 失去焦点
                        inputEle.blur(() => {
                            inputEle.attr('placeholder', '选择或输入');
                            iEle.removeClass().addClass("layui-edge");
                        });
                    }
                })
            }
        })
    }


}

const commontool = new commonTool();